const validateId = (id) => {
  if (!id) return 'saleIdEmpty';
  return '';
};

const validatesQuantity = (quantity) => {
  if (typeof quantity !== 'number') return 'productQuantityEmpty';
  if (quantity <= 0) return 'productQuantityShort';
  return '';
};

const validateNewSale = (body) => {
  const { productId, quantity } = body[0];

  if (validatesQuantity(quantity)) return validatesQuantity(quantity);
  if (validateId(productId)) return validateId(productId);
  return '';
};

module.exports = {
  validateNewSale,
};
