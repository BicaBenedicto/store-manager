require('dotenv').config();
const express = require('express');
const SalesRouter = require('./routes/sales');
const ProductsRouter = require('./routes/products');

const app = express();

app.use(express.json());

app.use('/sales', SalesRouter);
app.use('/products', ProductsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
