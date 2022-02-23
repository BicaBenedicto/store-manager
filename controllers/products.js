const { ProductsServices } = require('../services/products');

const get = async (_req, res, _next) => {
  const products = await ProductsServices();
  return res.status(200).json(products);
};

module.exports = {
  get,
};