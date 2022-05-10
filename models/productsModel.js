const connection = require('./connection');
const objectError = require('../utils/objectError');
const { HTTP_NOT_FOUND_STATUS } = require('../utils/status-HTTP');

const getProductsAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id';

  const [products] = await connection.execute(query);

  return products;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  if (product.length > 0) return product[0];

  throw objectError(HTTP_NOT_FOUND_STATUS, 'Product not found');
};

const getProductByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';

  const [product] = await connection.execute(query, [name]);

  return product[0];
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

  const [registeredProduct] = await connection.execute(query, [name, quantity]);

  const product = {
    id: registeredProduct.insertId,
    name,
    quantity,
  };

  return product;
};

module.exports = {
  getProductsAll,
  getProductById,
  getProductByName,
  createProduct,
}; 