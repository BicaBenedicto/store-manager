const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/sales');
const connection = require('../../../models/connection');

describe('Verifica controller de sales com rota delete', () => {
  const response = {};
  const request = {};

  before(async () => {
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

  after(async () => {
    connection.execute.restore();
  });

  it('rota volta status de 204 ao utilizar delete', async () => {
    await SalesController.remove(request, response);

    expect(response.status.calledWith(204)).to.be.equal(true);
  });
});