const ProductsServices = require('../services/products');

const get = async (_req, res, _next) => {
  const products = await ProductsServices.get();
  return res.status(200).json(products);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const [products] = await ProductsServices.getById(Number(id));
  return res.status(200).json(products);
};

module.exports = {
  get,
  getById,
};