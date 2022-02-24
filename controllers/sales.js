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
  const { body } = req;
  
  const newProductValidate = body.map((obj) => validateNewSale(obj)).find((obj) => obj);
  if (newProductValidate) return next(newProductValidate);

  const response = await SalesServices.create(body);
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

const update = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  const newProductValidate = body.map((obj) => validateNewSale(obj)).find((obj) => obj);
  if (newProductValidate) return next(newProductValidate);

  const response = await SalesServices.update(id, body);
  return res.status(200).json(response);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const response = await SalesServices.remove(id);
  if (response.error) return next(response.error);

  return res.status(204).end();
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};