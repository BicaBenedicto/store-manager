const SalesModels = require('../models/sales');

const get = async () => {
  const response = await SalesModels.getAll();
  const newResponse = response.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  return newResponse;
};

const getById = async (id) => {
  const response = await SalesModels.getById(id);
  const newResponse = response.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  return newResponse;
};

const create = async (productId, quantity) => SalesModels.create(productId, quantity);

module.exports = {
  get,
  getById,
  create,
};
