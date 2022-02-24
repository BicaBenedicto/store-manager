const express = require('express');
const ProductsController = require('../controllers/products');

const route = express();

route.delete('/:id', ProductsController.remove);

route.get('/', ProductsController.get);

route.get('/:id', ProductsController.getById);

route.post('/', ProductsController.create);

route.put('/:id', ProductsController.update);

module.exports = route;
