const salesModel = require('../models/salesModel');

const getSalesAll = async () => {
  const sales = await salesModel.getSalesAll();

  return sales;
};

const getSaleById = async (id) => {
  const sales = await salesModel.getSaleById(id);

  return sales;
};

const createSale = async (body) => {
  const newId = await salesModel.createIdSale();

  await Promise.all(body
    .map(({ productId, quantity }) => salesModel.createSale(newId, productId, quantity)));

  const newSale = {
    id: newId,
    itemsSold: body,
  };

  return newSale;
};

module.exports = {
  getSalesAll,
  getSaleById,
  createSale,
};