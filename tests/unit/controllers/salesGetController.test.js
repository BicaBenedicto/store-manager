const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/sales.controller');
const connection = require('../../../models/connection.model');

describe('Verifica controller de sales com rota get', () => {
  const response = {};
  const request = {};

  beforeAll(async () => {
    const execute = [[
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ], []];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = [{ productId: 1, quantity: 10 }];
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

  });

  afterAll(async () => {
    connection.execute.restore();
  });

  it('rota volta status de 200 ao utilizar get', async () => {
    await SalesController.get(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('rota volta status de 200 ao utilizar get procurando por id', async () => {
    await SalesController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});
