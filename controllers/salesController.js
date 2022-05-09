const salesService = require('../services/salesService');
const { HTTP_OK_STATUS } = require('../utils/status-HTTP');

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

module.exports = {
  getSalesAll,
  getSaleById,
}; 