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
    request.body = [{ productId: 1, quantity: 10 }];
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

describe('Verifica controller de sales com rota post', () => {
  const response = {};
  const request = {};
  const next = (e) => console.log(e);

  before(async () => {
    const execute = [[]];

    request.body = [{ productId: 1, quantity: 10 }];
    request.params = {
      id: 1,
    };
    
    response.status = sinon.stub()
    .returns(response);
    response.json = sinon.stub()
    .returns();
    sinon.stub(SalesController, 'create').resolves(response.status(201).json({}));

  });

  after(async () => {
    SalesController.create.restore();
  });

  it('rota volta status de 201 ao utilizar post', async () => {
    await SalesController.create(request, response, next);
    expect(response.status.calledWith(201)).to.be.equal(true);
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

  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('saleNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('controller executa next de error em post sem productId', async () => {
    request.body[0].quantity = 10;
    await SalesController.create(request, response, next);
    expect(next.calledWith('saleIdEmpty')).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem productId', async () => {
    await ErrorsMiddleware('saleIdEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('controller executa next de error em post sem quantity', async () => {
    request.body[0].productId = 1;
    request.body[0].quantity = '';
    await SalesController.create(request, response, next);
    expect(next.calledWith('productQuantityEmpty')).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem quantity', async () => {
    await ErrorsMiddleware('productQuantityEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('controller executa next de error em post com quantity baixa', async () => {
    request.body[0].productId = 1;
    request.body[0].quantity = -5;
    await SalesController.create(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com quantity baixa', async () => {
    await ErrorsMiddleware('productQuantityShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });
});

describe('Verifica controller de sales ao atualizar', () => {
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

  it('rota volta status de 200 ao utilizar put', async () => {
    await SalesController.update(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('rota volta status de 204 ao utilizar delete', async () => {
    await SalesController.remove(request, response);

    expect(response.status.calledWith(204)).to.be.equal(true);
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
