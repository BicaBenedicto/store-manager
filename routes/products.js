const express = require('express');
const ProductsController = require('../controllers/products');

const route = express();

route.get('/', ProductsController.get);

route.get('/:id', ProductsController.getById);

route.post('/', ProductsController.create);

module.exports = route;
