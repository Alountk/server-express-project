import { RequestHandler } from "express";
import Post from "./Post";
export const getPosts: RequestHandler = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (error) {
    res.json(error)
  }
};
export const getPost: RequestHandler = async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) return res.status(204).json();
  res.status(200).json(post);
};
export const createPost: RequestHandler = async (req, res) => {
  const postFound = await Post.findOne({title: req.body.title});

  if(postFound){
    return res.status(301).json({message: 'The Title already exists'});
  }

  const post = new Post(req.body);
  const savePost = await post.save();
  res.json(savePost);
};
export const deletePost: RequestHandler = (req, res) => {
  res.json('deleting a post')
};
export const updatePost: RequestHandler = (req, res) => {
  res.json('updating a post')
};