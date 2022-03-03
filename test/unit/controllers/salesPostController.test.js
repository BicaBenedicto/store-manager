const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/sales.controller');
const connection = require('../../../models/connection.model');

describe('Verifica controller de sales com rota post', () => {
  const response = {};
  const request = {};
  let next;

  before(async () => {
    const execute = [[{ productId: 1, quantity: 10 }]];
    next = sinon.stub().returns();
    request.body = [{ productId: 1, quantity: 5 }];
    request.params = {
      id: 1,
    };
    
    response.status = sinon.stub()
    .returns(response);
    response.json = sinon.stub()
    .returns();
    sinon.stub(connection, 'execute').resolves(execute);

  });

  after(async () => {
    connection.execute.restore();
  });

  it('rota volta status de 201 ao utilizar post', async () => {
    await SalesController.create(request, response, next);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});
