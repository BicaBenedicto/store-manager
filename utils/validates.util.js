const validateName = (name) => {
  const MIN_NAME = 5;
  if (!name) return 'productNameEmpty';
  if (name.length < MIN_NAME) return 'productNameShort';
  return false;
};

const validatesQuantity = (quantity) => {
  if (typeof quantity !== 'number') return 'productQuantityEmpty';
  if (quantity <= 0) return 'productQuantityShort';
  return false;
};

const validateNewProduct = (body) => {
  const { name, quantity } = body;
  if (validateName(name)) return validateName(name);
  if (validatesQuantity(quantity)) return validatesQuantity(quantity);
  return false;
};

const validateNewSale = (body) => {
  const { productId, quantity } = body;

  if (validatesQuantity(quantity)) return validatesQuantity(quantity);
  if (!productId) return 'saleIdEmpty';
  return false;
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};
