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

module.exports = {
  getProductsAll,
  getProductById,
}; 