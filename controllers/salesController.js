const salesService = require('../services/salesService');
const { HTTP_OK_STATUS, HTTP_CREATED_STATUS } = require('../utils/status-HTTP');

const getSalesAll = async (_req, res) => {
  const sales = await salesService.getSalesAll();

  return res.status(HTTP_OK_STATUS).json(sales);
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sales = await salesService.getSaleById(id);

    return res.status(HTTP_OK_STATUS).json(sales);
  } catch (err) {
    next(err);
  }
};

const createSale = async (req, res) => {
  const { body } = req;

  const successfulSale = await salesService.createSale(body);

  return res.status(HTTP_CREATED_STATUS).json(successfulSale);
}; 

module.exports = {
  getSalesAll,
  getSaleById,
  createSale,
}; 