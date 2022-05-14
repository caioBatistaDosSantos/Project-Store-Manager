const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');
const { HTTP_NOT_FOUND_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS } = require('../../../utils/status-HTTP');

describe('Testando a funcão getSalesAll:', () => {
  describe('Quando não existe nenhuma venda:', () => {
    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.an('array');
    });

    it('o array esta vazio', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existem vendas:', () => {
    const resultExecute = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute]);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.an('array');
    });

    it('o array não esta vazio', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const result = await salesModel.getSalesAll();

      result.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos possuem as propriedades saleId, date, productId e quantity', async () => {
      const result = await salesModel.getSalesAll();

      result.map((element) => {
        expect(element).to.be.includes.all.keys(
          'saleId',
          'date',
          'productId',
          'quantity',
        );
      });
    });
  });
});

describe('Testando a funcão getSaleById:', () => {
  describe('Quando o id da venda não existe:', () => {
    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um erro de status "404"', async () => {
      try {
        await salesModel.getSaleById();
      } catch (error) {
        expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Sale not found"', async () => {
      try {
        await salesModel.getSaleById();
      } catch (error) {
        expect(error.message).to.equal('Sale not found');
      }
    });
  });

  describe('Quando o id da venda existe:', () => {
    const resultExecute = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute]);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.an('array');
    });

    it('o array não esta vazio', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const result = await salesModel.getSalesAll();

      result.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos possuem as propriedades saleId, date, productId e quantity', async () => {
      const result = await salesModel.getSalesAll();

      result.map((element) => {
        expect(element).to.be.includes.all.keys(
          'saleId',
          'date',
          'productId',
          'quantity',
          'quantity',
        );
      });
    });
  });
});

describe('Testando a funcão createIdSale:', () => {
  const resultExecute = [{ insertId: 1 }];

  beforeEach(() => {
    sinon.stub(connection, 'execute')
      .resolves(resultExecute);
  });

  afterEach(() => connection.execute.restore());

  it('retorna um numero como novo id', async () => {
    const result = await salesModel.createIdSale();

    expect(result).to.be.an('number');
  });

  it('retorna o novo id como: "1"', async () => {
    const result = await salesModel.createIdSale();

    expect(result).to.equal(1);
  });
});

describe('Testando a funcão getQuantityAndProduct:', () => {
  const resultExecute = [{ product_id: 1, quantity: 10 }];

  beforeEach(() => {
    sinon.stub(connection, 'execute')
      .resolves([resultExecute]);
  });

  afterEach(() => connection.execute.restore());

  it('retorna um array', async () => {
    const result = await salesModel.getQuantityAndProduct();

    expect(result).to.be.an('array');
  });

  it('o array não esta vazio', async () => {
    const result = await salesModel.getQuantityAndProduct();

    expect(result).to.be.not.empty;
  });

  it('o array possui objetos', async () => {
    const result = await salesModel.getQuantityAndProduct();

    result.map((element) => {
      expect(element).to.be.an('object');
    });
  });

  it('os objetos possuem as propriedades product_id e quantity', async () => {
    const result = await salesModel.getQuantityAndProduct();

    result.map((element) => {
      expect(element).to.be.includes.all.keys(
        'product_id',
        'quantity',
      );
    });
  });
});

describe('Testando erros da funcão validateQuantityProduct:', () => {
  const payloadId = 1;
  const payloadQuantity = 20;
  const resultExecute = [{ quantity: 10 }];

  beforeEach(() => {
    sinon.stub(connection, 'execute')
      .resolves([resultExecute]);
  });

  afterEach(() => connection.execute.restore());

  it('retorna um erro com o status "422"', async () => {
    try {
      await salesModel
        .validateQuantityProduct(payloadId, payloadQuantity);
    } catch (error) {
      expect(error.status).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
    }
  });

  it('retorna um erro com a mensagem "Such amount is not permitted to sell"', async () => {
    try {
      await salesModel
        .validateQuantityProduct(payloadId, payloadQuantity);
    } catch (error) {
      expect(error.message).to.equal('Such amount is not permitted to sell');
    }
  });
});