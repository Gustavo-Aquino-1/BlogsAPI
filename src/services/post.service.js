const {
  BlogPost,
  Category,
  PostCategory,
  User,
  Sequelize,
} = require('../models');

const { Op } = Sequelize;

const create = async (id, body) => {
  const { title, content, categoryIds } = body;
  const invalidIds = {
    type: 400,
    message: 'one or more "categoryIds" not found',
  };

  const existsAllCategories = await Promise.all(
    categoryIds.map(async (e) => Category.findByPk(e)),
  );

  if (existsAllCategories.some((e) => e === null) || categoryIds.length === 0) {
    return invalidIds;
  }

  const newPost = await BlogPost.create({ title, content, userId: id });

  const objects = categoryIds.map((e) => ({
    postId: newPost.id,
    categoryId: +e,
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
  const { message } = await getAll();
  const post = message.find((e) => +e.id === +id);
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

const search = async (query) => {
  if (!query) return { type: 200, message: await (await getAll()).message };
  const findQuery = `%${query}%`;
  let posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: findQuery } },
        { content: { [Op.like]: findQuery } },
      ],
    },
  });

  if (posts.length > 0) {
    posts = await Promise.all(
      posts.map(async (e) => (await getById(e.id)).message),
    );
  }

  return { type: 200, message: posts };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};
