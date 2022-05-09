const productsService = require('../services/productsService');
const { HTTP_OK_STATUS } = require('../utils/status-HTTP');

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

module.exports = {
  getProductsAll,
  getProductById,
}; 