const productsModel = require('../models/productsModel');
const objectError = require('../utils/objectError');

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

  if (verifyProduct) throw objectError(409, 'Product already exists');

  const registeredProduct = await productsModel.createProduct(name, quantity);

  return registeredProduct;
};

module.exports = {
  getProductsAll,
  getProductById,
  createProduct,
};