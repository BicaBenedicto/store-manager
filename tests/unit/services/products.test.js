const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection.model');
const ProductsServices = require('../../../services/products.service');

describe('Verifica services da rota products', () => {
  before(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);

  });

  after(async () => {
    connection.execute.restore();
  });

  it('se o retorno ao criar é um objeto', async () => {
    const name = 'Produto A';
    const quantity = 10;
    const results = await ProductsServices.create(name, quantity);
    expect(results).to.be.an('object');
  });

  it('se o retorno ao deletar é um objeto', async () => {
    const id = 1;
    const results = await ProductsServices.remove(id);
    expect(results).to.be.an('object');
  });

  it('se o retorno ao atualizar é um objeto', async () => {
    connection.execute.restore();
    const execute2 = [[{ id: 1, name: 'Produto A', quantity: 5}]]
    sinon.stub(connection, 'execute').resolves(execute2);

    const name = 'Produto A';
    const quantity = 10;
    const results = await ProductsServices.update(name, quantity);
    expect(results).to.be.an('object');
  });
});
