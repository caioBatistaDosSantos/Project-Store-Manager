const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');
const { HTTP_NOT_FOUND_STATUS } = require('../../../utils/status-HTTP');

describe('Testando a funcão getProductsAll:', () => {
  describe('Quando não existe nenhum produto:', () => {
    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await productModel.getProductsAll();

      expect(result).to.be.an('array');
    });

    it('o array esta vazio', async () => {
      const result = await productModel.getProductsAll();

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
      sinon.stub(connection, 'execute')
        .resolves([resultExecute]);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await productModel.getProductsAll();

      expect(result).to.be.an('array');
    });

    it('o array não esta vazio', async () => {
      const result = await productModel.getProductsAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const result = await productModel.getProductsAll();

      result.map((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('os objetos possuem as propriedades id, name e quantity', async () => {
      const result = await productModel.getProductsAll();

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
    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um erro de status 404', async () => {
      try {
        await productModel.getProductById();
      } catch (error) {
        expect(error.status).to.equal(HTTP_NOT_FOUND_STATUS);
      }
    });

    it('retorna um erro com a mensagem "Product not found"', async () => {
      try {
        await productModel.getProductById();
      } catch (error) {
        expect(error.message).to.equal('Product not found');
      }
    });
  });

  describe('Quando o id do produto existe:', () => {
    const resultExecute = [
      {
        id: 1,
        name: "produto A",
        quantity: 10
      }
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute]);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um objeto', async () => {
      const result = await productModel.getProductById();

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await productModel.getProductById();

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades id, name e quantity', async () => {
      const result = await productModel.getProductById();

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Testando a funcão getProductByName:', () => {
  describe('Quando o nome do produto não existe:', () => {
    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    afterEach(() => connection.execute.restore());

    it('retorna "undefined"', async () => {
      const result = await productModel.getProductByName();

      expect(result).to.be.an('undefined');
    });
  });

  describe('Quando o nome do produto existe:', () => {
    const resultExecute = [{ id: 1, name: 'produto', quantity: 10 }];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute]);
    });

    afterEach(() => connection.execute.restore());

    it('retorna um objeto', async () => {
      const result = await productModel.getProductByName();

      expect(result).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
      const result = await productModel.getProductByName();

      expect(result).to.be.not.empty;
    });

    it('o objeto possue as propriedades id, name e quantity', async () => {
      const result = await productModel.getProductByName();
      
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Testando a funcão createProduct:', () => {
  const payloadName = 'produto A';
  const payloadQuantity = 100;

  beforeEach(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  describe('quando é criado com sucesso', () => {
    it('retorna um objeto', async () => {
      const result = await productModel
        .createProduct(payloadName, payloadQuantity);

      expect(result).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const result = await productModel
        .createProduct(payloadName, payloadQuantity);

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});