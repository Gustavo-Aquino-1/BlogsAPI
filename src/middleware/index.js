const { validateLogin } = require('./validateLogin');
const { validateToken } = require('./validateToken');
const { createPost } = require('./createPost');

module.exports = {
  validateLogin,
  validateToken,
  createPost,
};
