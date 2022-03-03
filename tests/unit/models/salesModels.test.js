const { expect } = require('chai');
const sinon = require('sinon');
const SalesModels = require('../../../models/sales.model');
const connection = require('../../../models/connection.model');

describe('Verifica model de sales', () => {

  before(async () => {
    const execute = [[
      {
        "sale_id": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "sale_id": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('get all retorna o esperado', async () => {
    const response = await SalesModels.getAll();
    expect(response).to.be.an('array');
  });

  it('get com id retorna o esperado', async () => {
    const response = await SalesModels.getById(1);
    expect(response).to.be.an('array');
  });
});

describe('Verifica erros de model de sales', () => {
  before(async () => {
    const execute = [[], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('get com id não existente retorna o esperado', async () => {
    const response = await SalesModels.getById(10);

    expect(response).to.be.an('array');
    expect(response).to.be.length(0);
  });
});

describe('Verifica model de sales com rota post', () => {
  const response = {};
  const request = {};
  const next = (e) => console.log(e);

  before(async () => {
    const execute = [[
      {
        "sale_id": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "sale_id": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ], []];

    sinon.stub(connection, 'execute').resolves(execute);


  });

  after(async () => {
    connection.execute.restore();
  });

  it('rota volta objeto ao utilizar post', async () => {
    const saleId = 1;
    const productId = 2;
    const quantity = 11;
    const response = await SalesModels.create(saleId, productId, quantity);
    expect(response).to.be.an('object');
  });

  it('rota volta objeto ao utilizar put', async () => {
    const saleId = 1;
    const productId = 1;
    const quantity = 11;
    const response = await SalesModels.update(saleId, productId, quantity);
    expect(response).to.be.an('object');
  });

  it('rota volta objeto ao utilizar delete', async () => {
    const saleId = 1;
    const response = await SalesModels.remove(saleId);
    expect(response).to.be.an('object');
  });
});
