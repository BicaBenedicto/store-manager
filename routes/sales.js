const express = require('express');
const SalesControllers = require('../controllers/sales');

const route = express();

route.get('/', SalesControllers.get);

route.get('/:id', SalesControllers.getById);

route.post('/', SalesControllers.create);

route.put('/:id', SalesControllers.update);

route.delete('/:id', SalesControllers.remove);

module.exports = route;
