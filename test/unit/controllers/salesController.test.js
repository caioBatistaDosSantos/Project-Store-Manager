const { expect } = require('chai');
const sinon = require('sinon');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const { HTTP_NOT_FOUND_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS, HTTP_OK_STATUS } = require('../../../utils/status-HTTP');
const objectError = require('../../../utils/objectError');

describe('Testando a funcão getSalesAll:', () => {
  describe('Quando não existe nenhuma venda:', () => {
    const req = {};
    const res = {};

    const resultExecute = [];

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'getSalesAll')
        .resolves(resultExecute);
    });

    afterEach(() => salesService.getSalesAll.restore());

    it('retorna status "200"', async () => {
      await salesController.getSalesAll(req, res);

      expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('retorna um json com array vazio', async () => {
      await salesController.getSalesAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Quando existem vendas:', () => {
    const req = {};
    const res = {};
  
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
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'getSalesAll')
        .resolves(resultExecute);
    });

    afterEach(() => salesService.getSalesAll.restore());

    it('retorna status "200"', async () => {
      await salesController.getSalesAll(req, res);

      expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('retorna um json com os dados', async () => {
      await salesController.getSalesAll(req, res);

      expect(res.json.calledWith(resultExecute)).to.be.equal(true);
    });

    // it('retorna um array', async () => {
    //   const result = await salesController.getSalesAll();

    //   expect(result).to.be.an('array');
    // });

    // it('o array não esta vazio', async () => {
    //   const result = await salesController.getSalesAll();

    //   expect(result).to.be.not.empty;
    // });

    // it('o array possui objetos', async () => {
    //   const result = await salesController.getSalesAll();

    //   result.map((element) => {
    //     expect(element).to.be.an('object');
    //   });
    // });

    // it('os objetos possuem as propriedades saleId, date, productId e quantity', async () => {
    //   const result = await salesController.getSalesAll();

    //   result.map((element) => {
    //     expect(element).to.be.includes.all.keys(
    //       'saleId',
    //       'date',
    //       'productId',
    //       'quantity',
    //     );
    //   });
    // });
  });
});

describe('Testando a funcão getSaleById:', () => {
  describe('Quando o id da venda existe:', () => {
    const req = { params: { id: 1 } };
    const res = {};
    const next = () => {};

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
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'getSaleById')
        .resolves(resultExecute);
    });

    afterEach(() => salesService.getSaleById.restore());

    it('retorna status "200"', async () => {
      await salesController.getSaleById(req, res, next);

      expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('retorna um json com os dados', async () => {
      await salesController.getSaleById(req, res, next);

      expect(res.json.calledWith(resultExecute)).to.be.equal(true);
    });
  });
});