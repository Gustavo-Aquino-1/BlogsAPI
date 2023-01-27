const { Router } = require('express');
const { userController } = require('../controller/index');
const mid = require('../middleware/index');

const router = Router();

router.post('/login', mid.validateLogin, userController.userLogin);

router.post('/user', userController.create);

router.get('/user', mid.validateToken, userController.getAll);

router.get('/user/:id', mid.validateToken, userController.getById);

router.delete('/user/me', mid.validateToken, userController.remove);

module.exports = router;