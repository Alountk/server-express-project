const express = require('express');
const cors = require('cors');
const logger = require('./loggerMiddleware');
require('./mongo');

const Note = require('./model/noteSchema');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [];

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((dbNotes) => {
    res.json(dbNotes);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const noteBack = notes.find((note) => note.id === id);
  if (noteBack) {
    res.json(noteBack);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  const noteBody = req.body;
  if (!noteBody || !noteBody.content) {
    return res.status(400).json({
      error: 'note.content is missing',
    });
  }
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: noteBody.content,
    important: typeof noteBody.important !== 'undefined' ? noteBody.important : false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  res.status(201).json(newNote);
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
