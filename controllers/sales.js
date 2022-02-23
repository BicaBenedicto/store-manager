const SalesServices = require('../services/sales');

const get = async (_req, res, _next) => {
  const products = await SalesServices.get();
  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const products = await SalesServices.getById(Number(id));
  if (products.length === 0) return next('saleNotFound');
  return res.status(200).json(products);
};

module.exports = {
  get,
  getById,
};