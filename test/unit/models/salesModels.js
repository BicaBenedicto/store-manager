const { expect } = require('chai');
const sinon = require('sinon');
const SalesModels = require('../../../models/sales');
const connection = require('../../../models/connection');

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