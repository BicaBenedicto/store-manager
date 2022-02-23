const { expect } = require('chai');
const { jsonTypesStrict } = require('frisby/src/frisby/expects');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/products');
const ErrorsMiddleware = require('../../../errors');
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

describe('Verifica erros de controller em produtos', () => {
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
    await ProductsController.getById(request, response, next);
    expect(next.calledWith('idNotFound')).to.be.equal(true);
  });

  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('idNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });
});
