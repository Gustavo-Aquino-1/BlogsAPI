const { Router } = require('express');
const { postController } = require('../controller/index');
const mid = require('../middleware/index');

const router = Router();

router.post('/post', mid.validateToken, mid.createPost, postController.create);

module.exports = router;