import mongoose, { ConnectionOptions} from 'mongoose';
import config from './config';

const connectionString = process.env.MONGO_DB_URI;

(async () => {
  try {
    const connectionOptions : ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    const db = await mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DATABASE}?retryWrites=true&w=majority`,connectionOptions);
    console.log(`Database is connected to: ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
})()