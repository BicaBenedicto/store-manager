const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/products');
const connection = require('../../../models/connection');

describe('Verifica rota de produtos', () => {
  const response = {};
  const request = {};

  before(() => {
    const execute = [{}];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = {};

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
  });

  it('rota volta status de 200 ao utilizar get', async () => {
    await ProductsController.get(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});
