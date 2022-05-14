const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const { HTTP_NOT_FOUND_STATUS, HTTP_CONFLICT_STATUS, HTTP_OK_STATUS } = require('../../../utils/status-HTTP');
const objectError = require('../../../utils/objectError');

describe('Testando a funcão getProductsAll:', () => {
  describe('Quando não existe nenhum produto:', () => {
    const req = {};
    const res = {};
  
    const resultExecute = [];

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'getProductsAll')
        .resolves(resultExecute);
    });

    afterEach(() => productsService.getProductsAll.restore());

    it('retorna status "200"', async () => {
      await productsController.getProductsAll(req, res);

      expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('retorna um json com array vazio', async () => {
      await productsController.getProductsAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Quando existem produtos:', () => {
    const req = {};
    const res = {};
  
    const resultExecute = [
      {
        id: 1,
        name: "produto A",
        quantity: 10
      },
      {
        id: 2,
        name: "produto B",
        quantity: 20
      },
    ];

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'getProductsAll')
        .resolves(resultExecute);
    });

    afterEach(() => productsService.getProductsAll.restore());

    it('retorna status "200"', async () => {
      await productsController.getProductsAll(req, res);

      expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('retorna um json com os dados', async () => {
      await productsController.getProductsAll(req, res);

      expect(res.json.calledWith(resultExecute)).to.be.equal(true);
    });

    // it('o array não esta vazio', async () => {
    //   const result = await productsController.getProductsAll();

    //   expect(result).to.be.not.empty;
    // });

    // it('o array possui objetos', async () => {
    //   const result = await productsController.getProductsAll();

    //   result.map((element) => {
    //     expect(element).to.be.an('object');
    //   });
    // });

    // it('os objetos possuem as propriedades id, name e quantity', async () => {
    //   const result = await productsController.getProductsAll();

    //   result.map((element) => {
    //     expect(element).to.be.includes.all.keys(
    //       'id',
    //       'name',
    //       'quantity',
    //     );
    //   });
    // });
  });
});

describe('Testando a funcão getProductById:', () => {
  // describe('Quando não existe nenhum produto:', () => {
  //   const req = {};
  //   const res = {};
  
  //   const resultExecute = [];

  //   beforeEach(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);

  //     sinon.stub(productsService, 'getProductsAll')
  //       .resolves(resultExecute);
  //   });

  //   afterEach(() => productsService.getProductsAll.restore());

  //   it('retorna status "200"', async () => {
  //     await productsController.getProductsAll(req, res);

  //     expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
  //   });

  //   it('retorna um json com array vazio', async () => {
  //     await productsController.getProductsAll(req, res);

  //     expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  //   });
  // });

  describe.only('Quando o id do produto existe:', () => {
    const req = { params: { id: 1 } };
    const res = {};
    const next = () => {};
  
    const resultExecute = {
      id: 1,
      name: "produto A",
      quantity: 10
    };

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'getProductById')
        .resolves(resultExecute);
    });

    afterEach(() => productsService.getProductById.restore());

    it('retorna status "200"', async () => {
      await productsController.getProductById(req, res, next);

      expect(res.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('retorna um json com os dados', async () => {
      await productsController.getProductById(req, res, next);

      expect(res.json.calledWith(resultExecute)).to.be.equal(true);
    });

    // it('o array não esta vazio', async () => {
    //   const result = await productsController.getProductsAll();

    //   expect(result).to.be.not.empty;
    // });

    // it('o array possui objetos', async () => {
    //   const result = await productsController.getProductsAll();

    //   result.map((element) => {
    //     expect(element).to.be.an('object');
    //   });
    // });

    // it('os objetos possuem as propriedades id, name e quantity', async () => {
    //   const result = await productsController.getProductsAll();

    //   result.map((element) => {
    //     expect(element).to.be.includes.all.keys(
    //       'id',
    //       'name',
    //       'quantity',
    //     );
    //   });
    // });
  });
});