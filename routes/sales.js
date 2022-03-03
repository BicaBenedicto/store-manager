const express = require('express');
const SalesControllers = require('../controllers/sales');
const SalesMiddleware = require('../middlewares/sales');

const route = express();

route.get('/',SalesMiddleware.get, SalesControllers.get);

route.get('/:id', SalesMiddleware.getById, SalesControllers.getById);

route.post('/', SalesMiddleware.create, SalesControllers.create);

route.put('/:id', SalesMiddleware.update, SalesControllers.update);

route.delete('/:id', SalesMiddleware.remove, SalesControllers.remove);

module.exports = route;
