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
  const [nameCreated] = await ProductsModels.getById(id);
  if (!nameCreated) return { error: 'productNotFound' };

  const [updated] = await ProductsModels.update(id, name, quantity);
  return updated;
};

module.exports = {
  get,
  getById,
  create,
  update,
};
