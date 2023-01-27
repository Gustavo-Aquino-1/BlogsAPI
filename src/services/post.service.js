const { BlogPost, Category, PostCategory, User } = require('../models');

const create = async (id, body) => {
  const { title, content, categoryIds } = body;
  const invalidIds = {
    type: 400,
    message: 'one or more "categoryIds" not found',
  };

  if (categoryIds.length === 0) return invalidIds;

  const existsAllCategories = await Promise.all(
    categoryIds.map(async (e) => Category.findByPk(e)),
  );

  if (existsAllCategories.some((e) => e === null)) return invalidIds;

  const newPost = await BlogPost.create({ title, content, userId: id });

  const objects = categoryIds.map((e) => ({
    // tive que colocar o underline manulamente pois o underscored nao esta funcionando nesta model!
    [`${'post_id'}`]: newPost.id,
    [`${'category_id'}`]: +e,
  }));

  await PostCategory.bulkCreate(objects);

  return { type: 201, message: newPost };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { type: 200, message: posts };
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!post) return { type: 404, message: 'Post does not exist' };
  return { type: 200, message: post };
};

const update = async (id, body) => {
  const { title, content, userId } = body;

  const postToUpdate = await getById(id);

  if (postToUpdate.message.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  await BlogPost.update(
    { title, content },
    {
      where: { id },
    },
  );

  const upatedPost = await getById(id);

  return { type: 200, message: upatedPost.message };
};

const remove = async (id, userId) => {
  const postToDelete = await BlogPost.findByPk(id);

  if (!postToDelete) return { type: 404, message: 'Post does not exist' };

  if (postToDelete.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  await BlogPost.destroy({
    where: { id },
  });

  return { type: 204, message: '' };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
