const ProductsModels = require('../models/products');

const ProductsServices = async () => {
  return ProductsModels.getAll();
};

module.exports = {
  ProductsServices,
};
