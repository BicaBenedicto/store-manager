const ProductsModels = require('../models/products');

const get = async () => ProductsModels.getAll();

const getById = async (id) => ProductsModels.getById(id);

const create = async (name, quantity) => {
  const [nameCreated] = await ProductsModels.findByName(name);
  if (nameCreated) return { error: 'productNameAlreadyExists' };
  const [created] = await ProductsModels.create(name, quantity);
  return created;
};

const update = async (id, name, quantity) => {
  const [idCreated] = await ProductsModels.getById(id);
  if (!idCreated) return { error: 'productNotFound' };

  const [updated] = await ProductsModels.update(id, name, quantity);
  return updated;
};

const remove = async (id) => {
  const [idCreated] = await ProductsModels.getById(id);
  if (!idCreated) return { error: 'productNotFound' };

  const deleted = await ProductsModels.remove(id);
  return deleted;
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
