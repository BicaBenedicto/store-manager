const ProductsModels = require('../models/products');

const get = async () => {
  return ProductsModels.getAll();
};

const getById = async (id) => {
  return ProductsModels.getById(id);
};

module.exports = {
  get,
  getById,
};
