const connection = require('./connection');
const objectError = require('../utils/objectError');
const { HTTP_NOT_FOUND_STATUS } = require('../utils/status-HTTP');

const getSalesAll = async () => {
  const query = `SELECT sa.id AS saleId, sa.date, sa_pro.product_id AS productId, sa_pro.quantity
  FROM sales AS sa
      JOIN sales_products AS sa_pro ON sa.id = sa_pro.sale_id
      ORDER BY sa_pro.sale_Id, sa_pro.product_Id`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getSaleById = async (id) => {
  const query = `SELECT sa.date, sa_pro.product_id AS productId, sa_pro.quantity
    FROM sales AS sa
      JOIN sales_products AS sa_pro ON sa.id = sa_pro.sale_id
      WHERE sa.id = ?
      ORDER BY sa_pro.sale_Id, sa_pro.product_Id`;

  const [sale] = await connection.execute(query, [id]);

  if (sale.length > 0) return sale;

  throw objectError(HTTP_NOT_FOUND_STATUS, 'Sale not found');
};

const createIdSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (?)';
  const date = new Date();

  const [sale] = await connection.execute(query, [date]);

  return sale.insertId;
};

const createSale = async (newId, productId, quantity) => {
  const query = `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
  
  await connection.execute(query, [newId, productId, quantity]);
};

const updateSale = async (id, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';

  await connection.execute(query, [quantity, id, productId]);
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';

  await connection.execute(query, [id]);
};

const getQuantityAndProduct = async (id) => {
  const query = 'SELECT product_id, quantity FROM sales_products WHERE sale_id = ?';

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const updateQuantityProduct = async (productId, quantity, string) => {
  let query = 'SELECT quantity FROM products WHERE id = ?';
  const [quantityProduct] = await connection.execute(query, [productId]);

  const newQuantityProduct = string === 'sum'
    ? quantityProduct[0].quantity + quantity
    : quantityProduct[0].quantity - quantity;

  query = 'UPDATE products SET quantity = ? WHERE id = ?';
  await connection.execute(query, [newQuantityProduct, productId]);
};

module.exports = {
  getSalesAll,
  getSaleById,
  createIdSale,
  createSale,
  updateSale,
  deleteSale,
  updateQuantityProduct,
  getQuantityAndProduct,
}; 