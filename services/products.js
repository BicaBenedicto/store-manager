const ProductsModels = require('../models/products');

const get = async () => ProductsModels.getAll();

const getById = async (id) => ProductsModels.getById(id);

const create = async (name, quantity) => ProductsModels.create(name, quantity);

module.exports = {
  get,
  getById,
  create,
};
