const { categoryService } = require('../services');

const create = async (req, res) => {
  const { type, message } = await categoryService.create(req.body);
  if (type !== 201) return res.status(type).json({ message });
  res.status(type).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await categoryService.getAll();
  res.status(type).json(message);
};

module.exports = {
  create,
  getAll,
};
