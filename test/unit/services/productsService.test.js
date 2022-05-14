const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService')
const productModel = require('../../../models/productsModel');
const { HTTP_NOT_FOUND_STATUS, HTTP_CONFLICT_STATUS } = require('../../../utils/status-HTTP');
const objectError = require('../../../utils/objectError');

describe('Testando a funcão getProductsAll:', () => {
  describe('Quando não existe nenhum produto:', () => {
    const resultExecute = [];

    beforeEach(() => {
      sinon.stub(productModel, 'getProductsAll')
        .resolves(resultExecute);
    });

    afterEach(() => productModel.getProductsAll.restore());

    it('retorna um array', async () => {
      const result = await productsService.getProductsAll();

      expect(result).to.be.an('array');
    });

    it('o array esta vazio', async () => {
      const result = await productsService.getProductsAll();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existem produtos:', () => {
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
      sinon.stub(productModel, 'getProductsAll')
        .resolves(resultExecute);
    });

    afterEach(() => productModel.getProductsAll.restore());

    it('retorna um array', async () => {
      const result = await productsService.getProductsAll();

      expect(result).to.be.an('array');
    });

    it('o array não esta vazio', async () => {
      const result = await productsService.getProductsAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const result = await productsService.getProductsAll();

      result.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos possuem as propriedades id, name e quantity', async () => {
      const result = await productsService.getProductsAll();

      result.map((element) => {
        expect(element).to.be.includes.all.keys(
          'id',
          'name',
          'quantity',
        );
      });
    });
  });
});

describe('Testando a funcão getProductById:', () => {
  describe('Quando o id do produto não existe:', () => {
    const resultExecute = () => {
      throw objectError(HTTP_NOT_FOUND_STATUS, 'Product not found');
    };

    beforeEach(() => {
      sinon.stub(productModel, 'getProductById')
        .resolves(resultExecute);
    });

    afterEach(() => productModel.getProductById.restore());

    it('retorna um erro de status 404', async () => {
      try {
        await productsService.getProductById();
      } catch (error) {
        expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Product not found"', async () => {
      try {
        await productsService.getProductById();
      } catch (error) {
        expect(error.message).to.equal('Product not found');
      }
    });
  });

  describe('Quando o id do produto existe:', () => {
    const resultExecute = {
      id: 1,
      name: "produto A",
      quantity: 10
    };

    beforeEach(() => {
      sinon.stub(productModel, 'getProductById')
        .resolves(resultExecute);
    });

    afterEach(() => productModel.getProductById.restore());

    it('retorna um objeto', async () => {
      const result = await productsService.getProductById();

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await productsService.getProductById();

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades id, name e quantity', async () => {
      const result = await productsService.getProductById();

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Testando a funcão createProduct:', () => {
  describe('Quando o nome do produto já existe:', () => {
    const resultExecute = {};
    const resultProductName = true;

    beforeEach(() => {
      sinon.stub(productModel, 'createProduct')
        .resolves(resultExecute),
      sinon.stub(productModel, 'getProductByName')
        .resolves(resultProductName);
    });

    afterEach(() => {
      productModel.createProduct.restore(),
      productModel.getProductByName.restore();
    });

    it('retorna um erro de status 409', async () => {
      try {
        await productsService.createProduct();
      } catch (error) {
        expect(error.status).to.equal(HTTP_CONFLICT_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Product already exists"', async () => {
      try {
        await productsService.createProduct();
      } catch (error) {
        expect(error.message).to.equal('Product already exists');
      }
    });
  });
  
  describe('Quando o nome do produto não existe:', () => {
    const resultExecute = {
      id: 1,
      name: "produto A",
      quantity: 10
    };
    const resultProductName = true;

    beforeEach(() => {
      sinon.stub(productModel, 'createProduct')
        .resolves(resultExecute),
      sinon.stub(productModel, 'getProductByName')
        .resolves(resultProductName);
    });

    afterEach(() => {
      productModel.createProduct.restore(),
      productModel.getProductByName.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.createProduct();

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await productsService.createProduct();

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades id, name e quantity', async () => {
      const result = await productsService.createProduct();

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Testando a funcão updateProduct:', () => {
  describe('Quando o nome do produto não existe:', () => {
    const resultExecute = {};
    const resultProductId = false;

    beforeEach(() => {
      sinon.stub(productModel, 'updateProduct')
        .resolves(resultExecute),
      sinon.stub(productModel, 'getProductById')
        .resolves(resultProductId);
    });

    afterEach(() => {
      productModel.updateProduct.restore(),
      productModel.getProductById.restore();
    });

    it('retorna um erro de status 404', async () => {
      try {
        await productsService.updateProduct();
      } catch (error) {
        expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Product not found"', async () => {
      try {
        await productsService.updateProduct();
      } catch (error) {
        expect(error.message).to.equal('Product not found');
      }
    });
  });
  
  describe('Quando o nome do produto já  existe:', () => {
    const resultExecute = {
      id: 1,
      name: "produto A",
      quantity: 10
    };
    const resultProductId = true;

    beforeEach(() => {
      sinon.stub(productModel, 'updateProduct')
        .resolves(resultExecute),
      sinon.stub(productModel, 'getProductById')
        .resolves(resultProductId);
    });

    afterEach(() => {
      productModel.updateProduct.restore(),
      productModel.getProductById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.updateProduct();

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await productsService.updateProduct();

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades id, name e quantity', async () => {
      const result = await productsService.updateProduct();

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Testando erros na funcão deleteProduct:', () => {
  const resultExecute = {};
  const resultProductId = false;

  beforeEach(() => {
    sinon.stub(productModel, 'deleteProduct')
      .resolves(resultExecute),
    sinon.stub(productModel, 'getProductById')
      .resolves(resultProductId);
  });

  afterEach(() => {
    productModel.deleteProduct.restore(),
    productModel.getProductById.restore();
  });

  it('retorna um erro de status 404', async () => {
    try {
      await productsService.deleteProduct();
    } catch (error) {
      expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
    }
  });

  it('retorna um erro com a mensagem "Product not found"', async () => {
    try {
      await productsService.updateProduct();
    } catch (error) {
      expect(error.message).to.equal('Product not found');
    }
  });
});