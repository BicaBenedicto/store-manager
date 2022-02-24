const { expect } = require('chai');
const { jsonTypesStrict } = require('frisby/src/frisby/expects');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/products');
const ErrorsMiddleware = require('../../../errors');
const connection = require('../../../models/connection');

describe('Verifica controller de produtos com rota get', () => {
  const response = {};
  const request = {};
  const next = (e) => console.log(e);

  before(async () => {
    const execute = [[{
      id: 1,
      name: "produto A",
      quantity: 10
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = { name: 'produto O', quantity: 10 };
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

describe('Verifica controller de produtos com rota post', () => {
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

  });

  after(async () => {
    connection.execute.restore();
  });

  it('rota volta status de 201 ao utilizar post', async () => {
    await ProductsController.create(request, response, next);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('rota volta status de 200 ao utilizar put', async () => {
    connection.execute.restore();

    const execute2 = [[{id: 1, name: 'produto A', quantity: 10 }]];
    sinon.stub(connection, 'execute').resolves(execute2);

    await ProductsController.update(request, response, next);
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
    request.body = { name: '', quantity: '' };
    request.params = {
      id: 10,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

  });

  beforeEach(() => {
    request.body = {
      name: '',
      quantity: '',
    };
  });

  after(async () => {
    connection.execute.restore();
  });

  it('controller executa next de error em get procurando por id não existente', async () => {
    await ProductsController.getById(request, response, next);
    expect(next.calledWith('productNotFound')).to.be.equal(true);
  });

  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('productNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('controller executa next de error em post sem quantity no body', async () => {
    request.body.name = 'Produto A';
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productQuantityEmpty')).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem quantity no body', async () => {
    await ErrorsMiddleware('productQuantityEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('controller executa next de error em post com nome curto', async () => {
    request.body.name = 'Pro';
    request.body.quantity = 10;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productNameShort')).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com nome curto', async () => {
    await ErrorsMiddleware('productNameShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('controller executa next de error em post sem nome no body', async () => {
    request.body.quantity = 10;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productNameEmpty')).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem nome no body', async () => {
    await ErrorsMiddleware('productNameEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('controller executa next de error em post com quantity negativa', async () => {
    request.body.name = 'Produto A';
    request.body.quantity = -1;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com quantity baixa', async () => {
    await ErrorsMiddleware('productQuantityShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('controller executa next de error em post com nome já existente', async () => {
    connection.execute.restore();
    const execute2 = [[{ id: 1, name: 'Produto A', quantity: 10}], []];
    sinon.stub(connection, 'execute').resolves(execute2);

    request.body.name = 'Produto A';
    request.body.quantity = 10;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productNameAlreadyExists')).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com nome já existente', async () => {
    await ErrorsMiddleware('productNameAlreadyExists', request, response);
    expect(response.status.calledWith(409)).to.be.equal(true);
  });
});

describe('Verifica erros ao atualizar produto', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    const execute = [[{ id: 1, name: 'Produto A', quantity: 10}]];
    next = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves(execute);
    request.body = { name: '', quantity: '' };
    request.params = {
      id: 1,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

  });

  beforeEach(() => {
    request.body = {
      name: '',
      quantity: '',
    };
    request.params = {
      id: 1,
    };
  });

  after(async () => {
    connection.execute.restore();
  });

  it('controller executa next de error em put usando id não existente', async () => {
    connection.execute.restore();
    sinon.stub(connection, 'execute').resolves([[]]);
    
    request.params = {
      id: 5,
    };
    request.body.name = 'Produto O';
    request.body.quantity = 10;

    await ProductsController.update(request, response, next);
    expect(next.calledWith('productNotFound')).to.be.equal(true);
  });

  it('rota volta status de 404 ao utilizar em put usando id não existente', async () => {
    await ErrorsMiddleware('productNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('controller executa next de error em put sem quantity no body', async () => {
    request.body.name = 'Produto A';
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productQuantityEmpty')).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar put sem quantity no body', async () => {
    await ErrorsMiddleware('productQuantityEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('controller executa next de error em put com nome curto', async () => {
    request.body.name = 'Pro';
    request.body.quantity = 10;
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productNameShort')).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar put com nome curto', async () => {
    await ErrorsMiddleware('productNameShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('controller executa next de error em put sem nome no body', async () => {
    request.body.quantity = 10;
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productNameEmpty')).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar put sem nome no body', async () => {
    await ErrorsMiddleware('productNameEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('controller executa next de error em put com quantity negativa', async () => {
    request.body.name = 'Produto A';
    request.body.quantity = -1;
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar put com quantity baixa', async () => {
    await ErrorsMiddleware('productQuantityShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });
});
