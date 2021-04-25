import {Router} from 'express';

const router = Router();

import * as postCtrl from "./posts.controller";

router.get('/posts', postCtrl.getPosts);

router.get('/posts/:id', postCtrl.getPost);

router.post('/posts', postCtrl.createPost);

router.delete('/posts/:id', postCtrl.deletePost)

router.put('/posts/:id', postCtrl.updatePost)

export default router;