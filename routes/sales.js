const express = require('express');

const route = express();

route.get('/', (req, res, next) => {
  return res.send(200).json();
});

route.get('/:id', (req, res, next) => {
  const { id } = req.params;
  return res.send(200).json();
});

module.exports = route;
