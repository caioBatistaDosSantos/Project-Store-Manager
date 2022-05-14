const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const { HTTP_NOT_FOUND_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS } = require('../../../utils/status-HTTP');
const objectError = require('../../../utils/objectError');

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

describe('Testando a funcão createSale:', () => {
  const body = [
    {
      productId: 1,
      quantity: 10
    }
  ];
  const id = 1;

  describe('Quando a quantidade do produto for insuficiente:', () => {
    const resultExecute = {};
    const resultValidate = () => {
      throw objectError(HTTP_UNPROCESSABLE_ENTITY_STATUS, 'Such amount is not permitted to sell');
    };

    beforeEach(() => {
      sinon.stub(salesModel, 'createSale')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'updateQuantityProduct')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'createIdSale')
        .resolves(id),
      sinon.stub(salesModel, 'validateQuantityProduct')
        .resolves(resultValidate);
    });

    afterEach(() => {
      salesModel.createSale.restore(),
      salesModel.updateQuantityProduct.restore(),
      salesModel.createIdSale.restore(),
      salesModel.validateQuantityProduct.restore();
    });

    it('retorna um erro de status 422', async () => {
      try {
        await salesService.createSale(body);
      } catch (error) {
        expect(error.status).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Such amount is not permitted to sell"', async () => {
      try {
        await salesService.createSale(body);
      } catch (error) {
        expect(error.message).to.equal('Such amount is not permitted to sell');
      }
    });
  });
  
  describe('Quando a quantidade do produto for suficiente:', () => {
    const resultExecute = {};

    beforeEach(() => {
      sinon.stub(salesModel, 'createSale')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'updateQuantityProduct')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'createIdSale')
        .resolves(id),
      sinon.stub(salesModel, 'validateQuantityProduct')
        .resolves(resultExecute);
    });

    afterEach(() => {
      salesModel.createSale.restore(),
      salesModel.updateQuantityProduct.restore(),
      salesModel.createIdSale.restore(),
      salesModel.validateQuantityProduct.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesService.createSale(body);

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await salesService.createSale(body);

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades id e itemsSold', async () => {
      const result = await salesService.createSale(body);

      expect(result).to.be.includes.all.keys(
        'id',
        'itemsSold',
      );
    });

    it('itemSold retorna um array', async () => {
      const result = await salesService.createSale(body);

      expect(result.itemsSold).to.be.an('array');
    });

    it('o array de itemSold contem objetos', async () => {
      const result = await salesService.createSale(body);

      result.itemsSold.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos de itemSold possuem as propriedades  productId e quantity', async () => {
      const result = await salesService.createSale(body);

      result.itemsSold.map((element) => {
        expect(element).to.be.includes.all.keys(
          'productId',
          'quantity',
        );
      });
    });
  });
});

describe('Testando a funcão updateSale:', () => {
  const body = [
    {
      productId: 1,
      quantity: 10
    }
  ];
  const id = 1;

  describe('Quando a venda não for valida:', () => {
    const resultVerify = false;
    const resultExecute = {};

    beforeEach(() => {
      sinon.stub(salesModel, 'updateSale')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'updateQuantityProduct')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'getSaleById')
        .resolves(resultVerify),
      sinon.stub(salesModel, 'validateQuantityProduct')
        .resolves(resultExecute);
    });

    afterEach(() => {
      salesModel.updateSale.restore(),
      salesModel.updateQuantityProduct.restore(),
      salesModel.getSaleById.restore(),
      salesModel.validateQuantityProduct.restore();
    });

    it('retorna um erro de status 404', async () => {
      try {
        await salesService.updateSale(id, body);
      } catch (error) {
        expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Sale not found"', async () => {
      try {
        await salesService.updateSale(id, body);
      } catch (error) {
        expect(error.message).to.equal('Sale not found');
      }
    });
  });

  describe('Quando a quantidade do produto for insuficiente:', () => {
    const resultVerify = true;
    const resultExecute = {};
    const resultValidate = () => {
      throw objectError(HTTP_UNPROCESSABLE_ENTITY_STATUS, 'Such amount is not permitted to sell');
    };

    beforeEach(() => {
      sinon.stub(salesModel, 'updateSale')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'updateQuantityProduct')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'getSaleById')
        .resolves(resultVerify),
      sinon.stub(salesModel, 'validateQuantityProduct')
        .resolves(resultValidate);
    });

    afterEach(() => {
      salesModel.updateSale.restore(),
      salesModel.updateQuantityProduct.restore(),
      salesModel.getSaleById.restore(),
      salesModel.validateQuantityProduct.restore();
    });

    it('retorna um erro de status 422', async () => {
      try {
        await salesService.updateSale(id, body);
      } catch (error) {
        expect(error.status).to.equal(HTTP_UNPROCESSABLE_ENTITY_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Such amount is not permitted to sell"', async () => {
      try {
        await salesService.updateSale(id, body);
      } catch (error) {
        expect(error.message).to.equal('Such amount is not permitted to sell');
      }
    });
  });
  
  describe('Quando a quantidade do produto for suficiente:', () => {
    const resultVerify = true;
    const resultExecute = {};

    beforeEach(() => {
      sinon.stub(salesModel, 'updateSale')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'updateQuantityProduct')
        .resolves(resultExecute),
      sinon.stub(salesModel, 'getSaleById')
        .resolves(resultVerify),
      sinon.stub(salesModel, 'validateQuantityProduct')
        .resolves(resultExecute);
    });

    afterEach(() => {
      salesModel.updateSale.restore(),
      salesModel.updateQuantityProduct.restore(),
      salesModel.getSaleById.restore(),
      salesModel.validateQuantityProduct.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesService.updateSale(id, body);

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await salesService.updateSale(id, body);

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades saleId e itemUpdated', async () => {
      const result = await salesService.updateSale(id, body);

      expect(result).to.be.includes.all.keys(
        'saleId',
        'itemUpdated',
      );
    });

    it('itemUpdated retorna um array', async () => {
      const result = await salesService.updateSale(id, body);

      expect(result.itemUpdated).to.be.an('array');
    });

    it('o array de itemUpdated contem objetos', async () => {
      const result = await salesService.updateSale(id, body);

      result.itemUpdated.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos de itemUpdated possuem as propriedades  productId e quantity', async () => {
      const result = await salesService.updateSale(id, body);

      result.itemUpdated.map((element) => {
        expect(element).to.be.includes.all.keys(
          'productId',
          'quantity',
        );
      });
    });
  });
});

describe('Testando erros na funcão deleteSale:', () => {
  const id = 1;
  const sale = [
    {
      product_id: 1,
      quantity: 10
    }
  ];
  const resultVerify = false;
  const resultExecute = {};

  beforeEach(() => {
    sinon.stub(salesModel, 'deleteSale')
      .resolves(resultExecute),
    sinon.stub(salesModel, 'updateQuantityProduct')
      .resolves(resultExecute),
    sinon.stub(salesModel, 'getSaleById')
      .resolves(resultVerify),
    sinon.stub(salesModel, 'getQuantityAndProduct')
      .resolves(sale);
  });

  afterEach(() => {
    salesModel.deleteSale.restore(),
    salesModel.updateQuantityProduct.restore(),
    salesModel.getSaleById.restore(),
    salesModel.getQuantityAndProduct.restore();
  });

  it('retorna um erro de status 404', async () => {
    try {
      await salesService.deleteSale(id);
    } catch (error) {
      expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
    }
  });

  it('retorna um erro com a mensagem "Sale not found"', async () => {
    try {
      await salesService.deleteSale(id);
    } catch (error) {
      expect(error.message).to.equal('Sale not found');
    }
  });
});