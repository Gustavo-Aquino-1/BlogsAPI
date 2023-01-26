const { Router } = require('express');
const { userController } = require('../controller/index');
const mid = require('../middleware/index');

const router = Router();

router.post('/login', mid.validateLogin, userController.userLogin);

module.exports = router;