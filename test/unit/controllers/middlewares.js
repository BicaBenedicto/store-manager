const { expect } = require('chai');
const sinon = require('sinon');
const ErrorsMiddleware = require('../../../errors');

describe('Verifica erros de controller em produtos', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    next = sinon.stub().returns();

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
  });

  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('productNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem quantity no body', async () => {
    await ErrorsMiddleware('productQuantityEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com nome curto', async () => {
    await ErrorsMiddleware('productNameShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem nome no body', async () => {
    await ErrorsMiddleware('productNameEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com quantity baixa', async () => {
    await ErrorsMiddleware('productQuantityShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('rota volta status de 422 ao utilizar post com nome já existente', async () => {
    await ErrorsMiddleware('productNameAlreadyExists', request, response);
    expect(response.status.calledWith(409)).to.be.equal(true);
  });

  it('rota volta status de 400 ao utilizar post sem productId', async () => {
    await ErrorsMiddleware('saleIdEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });
  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('saleNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });
  it('rota volta status de 404 ao utilizar get procurando por id não existente', async () => {
    await ErrorsMiddleware('quantityExcessive', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });
});
