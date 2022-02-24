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

const create = async (body) => {
  const saleId = await SalesModels.createSaleId();
  const created = await Promise.all(body.map(async ({ productId, quantity }) => SalesModels
    .create(saleId, productId, quantity)));

  return { id: saleId, itemsSold: created };
};

const update = async (saleId, body) => {
  const updated = await Promise.all(body.map(async ({ productId, quantity }) => SalesModels
    .update(saleId, productId, quantity)));
  
  return { saleId, itemUpdated: updated };
};

const remove = async (saleId) => {
  const [idCreated] = await SalesModels.getById(saleId);
  if (!idCreated) return { error: 'saleNotFound' };

  const removed = await SalesModels.remove(saleId);
  return removed;
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
