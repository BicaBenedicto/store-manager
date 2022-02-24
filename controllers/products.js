const ProductsServices = require('../services/products');
const { validateNewProduct } = require('../middlewares/products');

const get = async (_req, res, _next) => {
  const products = await ProductsServices.get();
  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const [products] = await ProductsServices.getById(Number(id));
  if (!products) return next('productNotFound');
  return res.status(200).json(products);
};

const create = async (req, res, next) => {
  const { body } = req;
  
  const newProductValidate = validateNewProduct(body);
  if (newProductValidate) return next(newProductValidate);

  const { name, quantity } = body;
  const response = await ProductsServices.create(name, quantity);
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

module.exports = {
  get,
  getById,
  create,
};