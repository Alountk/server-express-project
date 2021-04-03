require('dotenv').config();
require('./mongo');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const logger = require('./loggerMiddleware');

const Note = require('./model/noteSchema');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((dbNotes) => {
    res.json(dbNotes);
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findById(id).then((note) => {
    if (note) {
      res.status(200).json(note).end();
    } else {
      res.status(404).end();
    }
  }).catch((e) => {
    next(e);
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  const note = req.body;
  const updateNote = {
    content: note.content,
    important: note.important,
    date: new Date(),
  };
  Note.findByIdAndUpdate(id, updateNote, { new: true }).then((result) => {
    res.json(result);
  }).catch((e) => {
    next(e);
  });
});

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndDelete(id).then(() => {
    res.status(204).end();
  }).catch((error) => next(error));
});

app.post('/api/notes', (req, res) => {
  const noteBody = req.body;

  if (!noteBody || !noteBody.content) {
    return res.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const newNote = new Note({
    content: noteBody.content,
    important: noteBody.important || false,
    date: new Date(),
  });

  newNote.save().then((savedNote) => {
    response.json(savedNote);
  });

  res.status(201).json(newNote);
});

app.use(notFound);

app.use(handleErrors);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
