const connection = require('./connection.model');
const ProductsModels = require('./products.model');

const getAll = async () => {
  const [products] = await connection.execute(
    `SELECT
      sP.sale_id,
      s.date,
      sP.product_id,
      sP.quantity
    FROM StoreManager.sales_products AS sP
    JOIN StoreManager.sales AS s
    WHERE sP.sale_id = s.id
    GROUP BY sP.sale_id, sP.product_id, sP.quantity, s.date
    ORDER BY sP.sale_id, sP.product_id;`,
  );

  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute(
    `SELECT
      s.date,
      sP.product_id,
      sP.quantity
    FROM StoreManager.sales_products AS sP
    JOIN StoreManager.sales AS s
    WHERE sP.sale_id = s.id
    AND sP.sale_id = (?)
    GROUP BY sP.product_id, sP.quantity, s.date
    ORDER BY sP.product_id;`, [id],
  );
  return products;
};

const createSaleId = async () => {
  const [sales] = await connection.execute('INSERT INTO StoreManager.sales () VALUES ();');
  return sales.insertId;
};

const create = async (saleId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?);`, [saleId, productId, quantity],
  );
  const [product] = await ProductsModels.getById(productId);
  const { name } = product;
  await ProductsModels.update(productId, name, quantity);
  return { productId, quantity };
};

const update = async (saleId, productId, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products
      SET
        quantity = (?)
      WHERE sale_id = (?)
      AND product_id = (?)`, [quantity, saleId, productId],
  );
  const [product] = await ProductsModels.getById(productId);
  const { name } = product;
  await ProductsModels.update(productId, name, quantity);
  return { productId, quantity };
};

const remove = async (saleId) => {
  const saleResponse = await getById(saleId);
  saleResponse.forEach(async ({ product_id, quantity }) => {
    const [product] = await ProductsModels.getById(product_id);
    const { name, quantity: quantityActual } = product;

    const quantityFinal = quantity + quantityActual;
    await ProductsModels.update(product_id, name, quantityFinal);
  });
  const [results] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
  WHERE sale_id = (?)`, [saleId],
  );

  return { response: results.affectedRows };
};

module.exports = {
  getAll,
  getById,
  createSaleId,
  create,
  update,
  remove,
};
