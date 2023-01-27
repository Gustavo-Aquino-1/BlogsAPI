const { validateLogin } = require('./validateLogin');
const { validateToken } = require('./validateToken');
const { createPost } = require('./createPost');
const { updatePost } = require('./updatePost');

module.exports = {
  validateLogin,
  validateToken,
  createPost,
  updatePost,
};
