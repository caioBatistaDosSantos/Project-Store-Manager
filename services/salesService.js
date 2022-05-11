const salesModel = require('../models/salesModel');
const objectError = require('../utils/objectError');
const { HTTP_NOT_FOUND_STATUS } = require('../utils/status-HTTP');

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

const updateSale = async (id, body) => {
  const verifySale = await salesModel.getSaleById(id);

  if (!verifySale) throw objectError(HTTP_NOT_FOUND_STATUS, 'Sale not found');

  await Promise.all(body
    .map(({ productId, quantity }) => salesModel.updateSale(id, productId, quantity)));

  const updatedSale = {
    saleId: id,
    itemUpdated: body,
  };

  return updatedSale;
};

module.exports = {
  getSalesAll,
  getSaleById,
  createSale,
  updateSale,
};