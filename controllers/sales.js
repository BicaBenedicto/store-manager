const SalesServices = require('../services/sales');
const { validateNewSale } = require('../middlewares/sales');

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

const create = async (req, res, next) => {
  const [body] = req.body;
  console.log(body);
  const newProductValidate = validateNewSale(body);
  if (newProductValidate) return next(newProductValidate);

  const { productId, quantity } = body;
  await SalesServices.create(productId, quantity);
  return res.status(201);
};

module.exports = {
  get,
  getById,
  create,
};