const { Router } = require('express');
const { postController } = require('../controller/index');
const mid = require('../middleware/index');

const router = Router();

router.post('/post', mid.validateToken, mid.createPost, postController.create);

router.get('/post', mid.validateToken, postController.getAll);

router.get('/post/:id', mid.validateToken, postController.getById);

router.put(
  '/post/:id',
  mid.validateToken,
  mid.updatePost,
  postController.update,
);

module.exports = router;
