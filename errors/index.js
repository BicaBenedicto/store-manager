const ERRORS = {
  productNotFound: {
    code: 404,
    message: 'Product not found',
  },
  saleNotFound: {
    code: 404,
    message: 'Sale not found',
  },
};

const errorsGenericMiddleware = (err, _req, res, _next) => {
  if (!ERRORS[err]) return console.log(err);

  const { code, message } = ERRORS[err];
  return res.status(code).json({ message });
};

module.exports = errorsGenericMiddleware;
