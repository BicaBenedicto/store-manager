const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/sales.controller');
const connection = require('../../../models/connection.model');

describe('Verifica controller de sales com rota put', () => {
  const response = {};
  const request = {};

  beforeAll(async () => {
    const execute = [[{
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = [{ productId: 1, quantity: 10 }];
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

  afterAll(async () => {
    connection.execute.restore();
  });

  it('rota volta status de 200 ao utilizar put', async () => {
    await SalesController.update(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});
