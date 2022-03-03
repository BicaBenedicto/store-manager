const ERRORS = {
  productNotFound: {
    code: 404,
    message: 'Product not found',
  },
  saleNotFound: {
    code: 404,
    message: 'Sale not found',
  },
  productNameEmpty: {
    code: 400,
    message: '"name" is required',
  },
  productNameShort: {
    code: 422,
    message: '"name" length must be at least 5 characters long',
  },
  productQuantityEmpty: {
    code: 400,
    message: '"quantity" is required',
  },
  productQuantityShort: {
    code: 422,
    message: '"quantity" must be greater than or equal to 1',
  },
  saleIdEmpty: {
    code: 400,
    message: '"productId" is required',
  },
  productNameAlreadyExists: {
    code: 409,
    message: 'Product already exists',
  },
  quantityExcessive: {
    code: 422,
    message: 'Such amount is not permitted to sell',
  },
};

const errorsGenericMiddleware = (err, _req, res, _next) => {
  if (!ERRORS[err]) return res.status(500).json({ message: err.message });

  const { code, message } = ERRORS[err];
  return res.status(code).json({ message });
};

module.exports = errorsGenericMiddleware;
