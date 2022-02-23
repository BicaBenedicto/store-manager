const { expect } = require('chai');
const sinon = require('sinon');
const { ProductsController } = require('../../../controllers/products');

describe('Verifica rota de produtos', () => {
  const response = {};
  const request = {};

  before(() => {
    request.body = {};

    response.status = sinon.stub()
      .returns(response);
    response.send = sinon.stub()
      .returns();
  });

  it('rota volta status de 200 ao utilizar get', async () => {
    await ProductsController.create(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});