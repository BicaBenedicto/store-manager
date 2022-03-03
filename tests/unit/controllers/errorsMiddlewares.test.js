const { expect } = require('chai');
const sinon = require('sinon');
const ErrorsMiddleware = require('../../../errors');

describe('Verifica se ao chamar o erro, retorna o esperado', () => {
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

  it('caso produto não seja encontrado', async () => {
    await ErrorsMiddleware('productNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });

  it('caso a quantidade do produto esteja vazia', async () => {
    await ErrorsMiddleware('productQuantityEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('caso o nome seja muito curto', async () => {
    await ErrorsMiddleware('productNameShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('caso o nome esteja vazio', async () => {
    await ErrorsMiddleware('productNameEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });

  it('caso a quantidade esteja muito baixa', async () => {
    await ErrorsMiddleware('productQuantityShort', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });

  it('caso o nome do produto ja exista', async () => {
    await ErrorsMiddleware('productNameAlreadyExists', request, response);
    expect(response.status.calledWith(409)).to.be.equal(true);
  });

  it('caso o id da venda esteja vazio', async () => {
    await ErrorsMiddleware('saleIdEmpty', request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });
  it('caso a venda nao seja encontrada', async () => {
    await ErrorsMiddleware('saleNotFound', request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  });
  it('caso a quantidade da venda ultrapasse o do estoque', async () => {
    await ErrorsMiddleware('quantityExcessive', request, response);
    expect(response.status.calledWith(422)).to.be.equal(true);
  });
});
