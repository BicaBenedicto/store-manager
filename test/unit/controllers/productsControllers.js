const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/products');
const connection = require('../../../models/connection');

describe('Verifica controller de produtos', () => {
  const response = {};
  const request = {};

  before(() => {
    const execute = [[{
      id: 1,
      name: "produto A",
      quantity: 10
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = {};
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
  });

  after(async () => {
    connection.execute.restore();
  });

  it('rota volta status de 200 ao utilizar get', async () => {
    await ProductsController.get(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('rota volta status de 200 ao utilizar get procurando por id', async () => {
    await ProductsController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});
