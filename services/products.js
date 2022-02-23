const ProductsModels = require('../models/products');

const get = async () => ProductsModels.getAll();

const getById = async (id) => ProductsModels.getById(id);

module.exports = {
  get,
  getById,
};
