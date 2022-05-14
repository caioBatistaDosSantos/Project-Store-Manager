const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel');
const { HTTP_NOT_FOUND_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS } = require('../../../utils/status-HTTP');

describe('Testando a funcão getSalesAll:', () => {
  describe('Quando não existe nenhuma venda:', () => {
    const resultExecute = [];

    beforeEach(() => {
      sinon.stub(salesModel, 'getSalesAll')
        .resolves(resultExecute);
    });

    afterEach(() => salesModel.getSalesAll.restore());

    it('retorna um array', async () => {
      const result = await salesService.getSalesAll();

      expect(result).to.be.an('array');
    });

    it('o array esta vazio', async () => {
      const result = await salesService.getSalesAll();

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
      sinon.stub(salesModel, 'getSalesAll')
        .resolves(resultExecute);
    });

    afterEach(() => salesModel.getSalesAll.restore());

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
    const resultExecute = () => {
      throw objectError(HTTP_NOT_FOUND_STATUS, 'Sale not found');
    };

    beforeEach(() => {
      sinon.stub(salesModel, 'getSaleById')
        .resolves(resultExecute);
    });

    afterEach(() => salesModel.getSaleById.restore());

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
      sinon.stub(salesModel, 'getSaleById')
        .resolves(resultExecute);
    });

    afterEach(() => salesModel.getSaleById.restore());

    it('retorna um array', async () => {
      const result = await salesService.getSaleById();

      expect(result).to.be.an('array');
    });

    it('o array não esta vazio', async () => {
      const result = await salesService.getSaleById();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const result = await salesService.getSaleById();

      result.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos possuem as propriedades saleId, date, productId e quantity', async () => {
      const result = await salesService.getSaleById();

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