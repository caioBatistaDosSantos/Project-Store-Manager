const productsModel = require('../models/productsModel');
const objectError = require('../utils/objectError');
const { HTTP_CONFLICT_STATUS, HTTP_NOT_FOUND_STATUS } = require('../utils/status-HTTP');

const getProductsAll = async () => {
  const products = await productsModel.getProductsAll();

  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  return product;
};

const createProduct = async (name, quantity) => {
  const verifyProduct = await productsModel.getProductByName(name);

  if (verifyProduct) throw objectError(HTTP_CONFLICT_STATUS, 'Product already exists');

  const registeredProduct = await productsModel.createProduct(name, quantity);

  return registeredProduct;
};

const updateProduct = async (id, name, quantity) => {
  const verifyProduct = await productsModel.getProductById(id);

  if (!verifyProduct) throw objectError(HTTP_NOT_FOUND_STATUS, 'Product not found');

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const verifyProduct = await productsModel.getProductById(id);

  if (!verifyProduct) throw objectError(HTTP_NOT_FOUND_STATUS, 'Product not found');

  await productsModel.deleteProduct(id);
};

module.exports = {
  getProductsAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};