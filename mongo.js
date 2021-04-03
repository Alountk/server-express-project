const mongoose = require('mongoose');
const connectionString = require('./config');

const { Schema, model } = mongoose;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    console.log('Database connected');
  }).catch((e) => {
    console.error(e);
  });


// Note.find({}).then((result) => {
//   console.log(result);
//   mongoose.connection.close();
// });

// const note = new Note({
//   content: 'testSchema',
//   date: new Date(),
//   important: true,
// });

// note.save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((e) => {
//     console.error(e);
//   });
