const schemas = require('./validationsSchema');

const validateCreateUser = (body) => {
  const { error } = schemas.createUserSchema.validate(body);
  if (error) return error.message;
  return null;
};

module.exports = {
  validateCreateUser,
};
