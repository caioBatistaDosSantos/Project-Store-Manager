const productsService = require('../services/productsService');
const {
  HTTP_OK_STATUS, HTTP_CREATED_STATUS } = require('../utils/status-HTTP');

const getProductsAll = async (_req, res) => {
  const products = await productsService.getProductsAll();

  return res.status(HTTP_OK_STATUS).json(products);
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsService.getProductById(id);

    return res.status(HTTP_OK_STATUS).json(product);
  } catch (err) {
    next(err);
  } 
};

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productsService.createProduct(name, quantity);

    return res.status(HTTP_CREATED_STATUS).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const updatedProduct = await productsService.updateProduct(id, name, quantity);

    return res.status(HTTP_OK_STATUS).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProductsAll,
  getProductById,
  createProduct,
  updateProduct,
}; 