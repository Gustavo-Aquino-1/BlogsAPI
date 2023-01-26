const { userService } = require('../services');

const userLogin = async (req, res) => {
  const { type, message } = await userService.userLogin(req.body);
  if (type !== 200) return res.status(type).json({ message });
  res.status(type).json(message);
};

const create = async (req, res) => {
  const { type, message } = await userService.create(req.body);
  if (type !== 201) return res.status(type).json({ message });
  res.status(type).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await userService.getAll();
  res.status(type).json(message);
};

module.exports = {
  userLogin,
  create,
  getAll,
};
