const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    `SELECT
      id,
      name,
      quantity
    FROM StoreManager.products;`,
  );

  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute(
    `SELECT
      id,
      name,
      quantity
    FROM StoreManager.products
    WHERE id = (?);`, [id],
  );
  return products;
};

module.exports = {
  getAll,
  getById,
};
