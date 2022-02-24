const validateId = (id) => {
  if (!id) return 'saleIdEmpty';
  return '';
};

const validatesQuantity = (quantity) => {
  const MIN_QUANTITY = 1;
  if (!quantity) return 'productQuantityEmpty';
  if (quantity < MIN_QUANTITY) return 'productQuantityShort';
  return '';
};

const validateNewSale = (body) => {
  const { productId, quantity } = body;
  if (validateId(productId)) return validateId(productId);
  if (validatesQuantity(quantity)) return validatesQuantity(quantity);
  return '';
};

module.exports = {
  validateNewSale,
};
