const connection = require('./connection');

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
  return { productId, quantity };
};

module.exports = {
  getAll,
  getById,
  createSaleId,
  create,
  update,
};
