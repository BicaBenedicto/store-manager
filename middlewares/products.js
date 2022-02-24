const validateName = (name) => {
  const MIN_NAME = 5;
  if (!name) return 'productNameEmpty';
  if (name.length < MIN_NAME) return 'productNameShort';
  return '';
};

const validatesQuantity = (quantity) => {
  const MIN_QUANTITY = 1;
  if (!quantity) return 'productQuantityEmpty';
  if (quantity < MIN_QUANTITY) return 'productQuantityShort';
  return '';
};

const validateNewProduct = (body) => {
  const { name, quantity } = body;
  if (validateName(name)) return validateName(name);
  if (validatesQuantity(quantity)) return validatesQuantity(quantity);
  return '';
};

module.exports = {
  validateNewProduct,
};
