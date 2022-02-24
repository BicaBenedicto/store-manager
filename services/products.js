const ProductsModels = require('../models/products');

const get = async () => ProductsModels.getAll();

const getById = async (id) => ProductsModels.getById(id);

const create = async (name, quantity) => {
  const [nameCreated] = await ProductsModels.findByName(name);
  if (nameCreated) return { error: 'productNameAlreadyExists' };
  const created = await ProductsModels.create(name, quantity);
  return created;
};

module.exports = {
  get,
  getById,
  create,
};
