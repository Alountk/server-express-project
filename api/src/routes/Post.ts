import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {type: String, required: true, trim: true, unique: true},
  body: {type: String, trim: true},
  likes: {type: Array}
}, {
  versionKey: false,
  timestamps: true
});

export default model('Post', postSchema);