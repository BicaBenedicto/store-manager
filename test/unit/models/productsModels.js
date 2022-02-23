const { expect } = require('chai');
const sinon = require('sinon');
const ProductsModels = require('../../../models/products');
const connection = require('../../../models/connection');

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
});
