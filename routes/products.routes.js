const express = require('express');
const ProductsController = require('../controllers/products.controller');
const ProductsMiddleware = require('../middlewares/products.middleware');

const route = express();

route.delete('/:id', ProductsMiddleware.remove, ProductsController.remove);

route.get('/', ProductsMiddleware.get, ProductsController.get);

route.get('/:id', ProductsMiddleware.getById, ProductsController.getById);

route.post('/', ProductsMiddleware.create, ProductsController.create);

route.put('/:id', ProductsMiddleware.update, ProductsController.update);

module.exports = route;
