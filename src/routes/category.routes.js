const { Router } = require('express');
const { categoryController } = require('../controller/index');
const mid = require('../middleware/index');

const router = Router();

router.post('/categories', mid.validateToken, categoryController.create);

router.get('/categories', mid.validateToken, categoryController.getAll);

module.exports = router;