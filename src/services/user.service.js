const { User } = require('../models');
const JWT = require('../utils/jwtFunctions');
const validations = require('./validations/validateInputs');

const userLogin = async ({ email, password }) => {
  const users = await User.findAll();
  const userExists = users.find(
    (e) => e.email === email && e.password === password,
  );
  if (!userExists) return { type: 400, message: 'Invalid fields' };

  const token = JWT.generateToken({ id: userExists.id, email });
  return { type: 200, message: { token } };
};

const create = async (body) => {
  const error = validations.validateCreateUser(body);
  if (error) return { type: 400, message: error };
  const { displayName, email, password, image } = body;

  const users = await User.findAll();
  const userExists = users.find(
    (e) => e.email === email && e.password === password,
  );

  if (userExists) return { type: 409, message: 'User already registered' };

  await User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = JWT.generateToken({ displayName, email, image });

  return { type: 201, message: { token } };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { type: 200, message: users };
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return { type: 404, message: 'User does not exist' };

  return { type: 200, message: user };
};

const remove = async (id) => {
  await User.destroy({
    where: { id },
  });

  return { type: 204, message: '' };
};

module.exports = {
  userLogin,
  create,
  getAll,
  getById,
  remove,
};
