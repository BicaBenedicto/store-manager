const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/sales');
const ErrorsMiddleware = require('../../../errors');
const connection = require('../../../models/connection');

describe('Verifica controller de sales', () => {
  const response = {};
  const request = {};

  before(async () => {
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
    await SalesController.get(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('rota volta status de 200 ao utilizar get procurando por id', async () => {
    await SalesController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Verifica erros de controller em sales', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    const execute = [[], []];
    next = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = {};
    request.params = {
      id: 10,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

  });

  after(async () => {
    connection.execute.restore();
  });

  it('controller executa next de error em get procurando por id não existente', async () => {
    await SalesController.getById(request, response, next);
    expect(next.calledWith('saleNotFound')).to.be.equal(true);
  });

  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('saleNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });
});
