const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection.model');
const SalesServices = require('../../../services/sales.service');

describe('Verifica services da rota sales', () => {
  const request = {};
  before(() => {
    const execute = [[{ productId: 1, quantity: 10 }]];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = [{ productId: 1, quantity: 5 }];
  });

  after(async () => {
    connection.execute.restore();
  });

  it('se o retorno ao usar get é um array', async () => {
    const results = await SalesServices.get();
    expect(results).to.be.an('array');
  });

  it('se o retorno ao criar é um objeto', async () => {
    const results = await SalesServices.create(request.body);
    expect(results).to.be.an('object');
  });

  it('se o retorno ao atualizar é um objeto', async () => {
    const results = await SalesServices.update(1, request.body);
    expect(results).to.be.an('object');
  });

  it('se o retorno ao remover é um objeto', async () => {
    const results = await SalesServices.remove(1);
    expect(results).to.be.an('object');
  });
});
