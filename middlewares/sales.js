const SalesServices = require('../services/sales');
const { validateNewSale } = require('../utils/validates');

const get = async (req, _res, next) => {
  const products = await SalesServices.get();
  req.results = products;
  return next();
};

const getById = async (req, _res, next) => {
  const { id } = req.params;
  const products = await SalesServices.getById(Number(id));
  if (products.length === 0) return next('saleNotFound');
  req.results = products;
  return next();
};

const create = async (req, _res, next) => {
  const { body } = req;
  
  const newProductValidate = body.map((obj) => validateNewSale(obj)).find((obj) => obj);
  if (newProductValidate) return next(newProductValidate);

  const response = await SalesServices.create(body);
  if (response.error) return next(response.error);
  req.results = response;
  return next();
};

const update = async (req, _res, next) => {
  const { body } = req;
  const { id } = req.params;

  const newProductValidate = body.map((obj) => validateNewSale(obj)).find((obj) => obj);
  if (newProductValidate) return next(newProductValidate);

  const response = await SalesServices.update(id, body);
  req.results = response;
  return next();
};

const remove = async (req, _res, next) => {
  const { id } = req.params;

  const response = await SalesServices.remove(id);
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