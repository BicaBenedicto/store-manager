const express = require('express');
const ProductsController = require('../controllers/products');

const route = express();

route.get('/', ProductsController.get);

route.get('/:id', (req, res, _next) => {
  const { id } = req.params;
  return res.send(200).json();
});

module.exports = route;
