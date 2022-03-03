const { expect } = require('chai');
const sinon = require('sinon');
const ProductsModels = require('../../../models/products.model');
const connection = require('../../../models/connection.model');

describe('Verifica model de produtos', () => {

  before(async () => {
    const execute = [[{
      id: 1,
      name: "produto A",
      quantity: 10
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('get all retorna o esperado', async () => {
    const response = await ProductsModels.getAll();
    expect(response).to.be.an('array');
  });

  it('get com id retorna o esperado', async () => {
    const [response] = await ProductsModels.getById(1);
    expect(response).to.be.an('object');
  });

  it('post retorna o esperado', async () => {
    const [response] = await ProductsModels.create('Produto 0', 6);
    expect(response).to.be.an('object');
  });
});

describe('Verifica erros de model de produtos', () => {
  before(async () => {
    const execute = [[], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('get com id não existente retorna o esperado', async () => {
    const response = await ProductsModels.getById(10);

    expect(response).to.be.an('array');
    expect(response).to.be.length(0);
  });
});
