const productsModel = require('../models/productsModel');

const getProductsAll = async () => {
  const products = await productsModel.getProductsAll();

  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  return product;
};

module.exports = {
  getProductsAll,
  getProductById,
};