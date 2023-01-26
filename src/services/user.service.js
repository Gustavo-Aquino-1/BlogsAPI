const { User } = require('../models');
const JWT = require('../utils/jwtFunctions');

const userLogin = async ({ email, password }) => {
  const users = await User.findAll();
  const userExists = users.find(
    (e) => e.email === email && e.password === password,
  );
  if (!userExists) return { type: 400, message: 'Invalid fields' };

  const token = JWT.generateToken({ email });
  return { type: 200, message: { token } };
};

module.exports = {
  userLogin,
};
