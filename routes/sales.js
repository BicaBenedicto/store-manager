const express = require('express');
const SalesControllers = require('../controllers/sales');

const route = express();

route.get('/', SalesControllers.get);

route.get('/:id', SalesControllers.getById);

route.post('/', SalesControllers.create);

module.exports = route;
