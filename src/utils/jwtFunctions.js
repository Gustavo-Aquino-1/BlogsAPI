const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const generateToken = (payload, expiresIn = '1d') => {
  const jwtConfig = {
    expiresIn,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ payload }, JWT_SECRET, jwtConfig);

  return token;
};

module.exports = {
  generateToken,
};
