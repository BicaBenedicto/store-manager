const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/products.controller');
const connection = require('../../../models/connection.model');

describe('Verifica controller de produtos com rota delete', () => {
  const response = {};
  const request = {};
  const next = (e) => console.log(e);

  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = { name: 'produto O', quantity: 10 };
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    response.end = sinon.stub()
      .returns();

  });

  after(async () => {
    connection.execute.restore();
  });

  it('rota volta status 204 ao utilizar delete', async () => {
    connection.execute.restore();

    const execute2 = [[{id: 1, name: 'produto A', quantity: 10 }]];
    sinon.stub(connection, 'execute').resolves(execute2);

    await ProductsController.remove(request, response, next);
    expect(response.status.calledWith(204)).to.be.equal(true);
  });
});
