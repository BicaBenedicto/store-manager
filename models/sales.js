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

const create = async (productId, quantity) => {
  const products = await connection.execute(
    `INSERT INTO StoreManager.sale_product
    (product_id, quantity) VALUES (?, ?);`, [productId, quantity],
  );

  return products;
};

module.exports = {
  getAll,
  getById,
  create,
};
