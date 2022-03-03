const connection = require('./connection.model');

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

const create = async (name, quantity) => {
  const [products] = await connection.execute(
    `INSERT INTO StoreManager.products
    (name, quantity) VALUES (?, ?);`, [name, quantity],
  );
  const newProduct = [{
    id: products.insertId,
    name,
    quantity,
  }];
  return newProduct;
};

const findByName = async (name) => {
  const [products] = await connection.execute(
    `SELECT
      id,
      name,
      quantity
    FROM StoreManager.products
    WHERE name = (?);`, [name],
  );
  return products;
};

const update = async (id, name, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.products
      SET
        name = (?),
        quantity = (?)
      WHERE id = (?)`, [name, quantity, id],
  );
  return [{ id, name, quantity }];
};

const remove = async (id) => {
  const [results] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = (?)`, [id],
  );
  return { response: results.affectedRows };
};

module.exports = {
  getAll,
  getById,
  create,
  findByName,
  update,
  remove,
};
