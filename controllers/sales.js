const get = async (req, res, _next) => {
  const { results } = req;
  return res.status(200).json(results);
};

const getById = async (req, res, _next) => {
  const { results } = req;
  return res.status(200).json(results);
};

const create = async (req, res, _next) => {
  const { results } = req;
  return res.status(201).json(results);
};

const update = async (req, res, _next) => {
  const { results } = req;
  return res.status(200).json(results);
};

const remove = async (_req, res, _next) => {
  return res.status(204).end();
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};