const salesModel = require('../models/salesModel');

const getSalesAll = async () => {
  const sales = await salesModel.getSalesAll();

  return sales;
};

const getSaleById = async (id) => {
  const sales = await salesModel.getSaleById(id);

  return sales;
};

module.exports = {
  getSalesAll,
  getSaleById,
};