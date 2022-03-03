const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../middlewares/products');
const connection = require('../../../models/connection');

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

  it('controller executa next de error em post sem quantity no body', async () => {
    request.body.name = 'Produto A';
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productQuantityEmpty')).to.be.equal(true);
  });

  it('controller executa next de error em post com nome curto', async () => {
    request.body.name = 'Pro';
    request.body.quantity = 10;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productNameShort')).to.be.equal(true);
  });

  it('controller executa next de error em post sem nome no body', async () => {
    request.body.quantity = 10;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productNameEmpty')).to.be.equal(true);
  });

  it('controller executa next de error em post com quantity negativa', async () => {
    request.body.name = 'Produto A';
    request.body.quantity = -1;
    await ProductsController.create(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
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

  it('controller executa next de error em delete com id não existente', async () => {
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productNotFound')).to.be.equal(true);
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

  it('controller executa next de error em put sem quantity no body', async () => {
    request.body.name = 'Produto A';
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productQuantityEmpty')).to.be.equal(true);
  });

  it('controller executa next de error em put com nome curto', async () => {
    request.body.name = 'Pro';
    request.body.quantity = 10;
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productNameShort')).to.be.equal(true);
  });

  it('controller executa next de error em put sem nome no body', async () => {
    request.body.quantity = 10;
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productNameEmpty')).to.be.equal(true);
  });

  it('controller executa next de error em put com quantity negativa', async () => {
    request.body.name = 'Produto A';
    request.body.quantity = -1;
    await ProductsController.update(request, response, next);
    expect(next.calledWith('productQuantityShort')).to.be.equal(true);
  });
});
