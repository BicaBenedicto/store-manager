const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../middlewares/sales.middleware');
const connection = require('../../../models/connection.model');

describe('Verifica erros de controller em sales', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    const execute = [[], []];
    next = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = [{ productId: '', quantity: '' }];
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

  beforeEach(() => {
    request.body = [{ productId: '', quantity: '' }];
  });

  it('controller executa next de error em get procurando por id não existente', async () => {
    await SalesController.getById(request, response, next);
    expect(next.calledWith('saleNotFound')).to.be.equal(true);
  });

  it('controller executa next de error em post sem productId', async () => {
    request.body[0].quantity = 10;
    await SalesController.create(request, response, next);
    expect(next.calledWith('saleIdEmpty')).to.be.equal(true);
  });

  it('controller executa next de error em post sem quantity', async () => {
    request.body[0].productId = 1;
    request.body[0].quantity = '';
    await SalesController.create(request, response, next);
    expect(next.calledWith('productQuantityEmpty')).to.be.equal(true);
  });

  it('controller executa next de error em post com quantity baixa', async () => {
    request.body[0].productId = 1;
    request.body[0].quantity = -5;
    await SalesController.create(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
  });

  it('retorna erro de next ao utilizar post com quantidade de produto excessiva', async () => {
    connection.execute.restore();

    const execute2 = [[{ productId: 1, quantity: 10 }]];
    sinon.stub(connection, 'execute').resolves(execute2);

    request.body = [{ productId: 1, quantity: 500 }];

    await SalesController.create(request, response, next);
    expect(next.calledWith('quantityExcessive')).to.be.equal(true);
  });
});

describe('Verifica erros de controller de sales ao atualizar', () => {
  const response = {};
  const request = {};
  let next;

  before(async () => {
    const execute = [[], []];

    next = sinon.stub().returns();
    sinon.stub(connection, 'execute').resolves(execute);
    request.body = [{ productId: 1, quantity: 0 }];
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

  it('controller executa next de error em put com quantity baixa', async () => {
    await SalesController.update(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
  });

  it('controller executa next de error em delete com id nao existente', async () => {
    await SalesController.remove(request, response, next);
    expect(next.calledWith('saleNotFound')).to.be.equal(true);
  });
});
