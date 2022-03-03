const ProductsServices = require('../services/products.service');
const { validateNewProduct } = require('../utils/validates.util');

const get = async (req, _res, next) => {
  const products = await ProductsServices.get();

  req.results = products;
  return next();
};

const getById = async (req, _res, next) => {
  const { id } = req.params;
  const [products] = await ProductsServices.getById(Number(id));
  if (!products) return next('productNotFound');

  req.results = products;
  return next();
};

const create = async (req, _res, next) => {
  const { body } = req;
  
  const newProductValidate = validateNewProduct(body);
  if (newProductValidate) return next(newProductValidate);

  const { name, quantity } = body;
  const response = await ProductsServices.create(name, quantity);
  if (response.error) return next(response.error);

  req.results = response;
  return next();
};

const update = async (req, _res, next) => {
  const { id } = req.params;
  const { body } = req;

  const newProductValidate = validateNewProduct(body);
  if (newProductValidate) return next(newProductValidate);

  const { name, quantity } = body;
  const response = await ProductsServices.update(id, name, quantity);

  if (response.error) return next(response.error);

  req.results = response;
  return next();
};

const remove = async (req, _res, next) => {
  const { id } = req.params;

  const response = await ProductsServices.remove(id);
  if (response.error) return next(response.error);

  return next();
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
