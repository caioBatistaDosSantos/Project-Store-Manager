const Joi = require('joi');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../utils/status-HTTP');

const SALE = Joi.object({
  productId: Joi.number().required()
    .messages({
      required: '"productId" is required',
    }),
  quantity: Joi.number().min(1).required()
    .messages({
      required: '"quantity" is required',
      pattern: '"quantity" must be greater than or equal to 1',
    }),
});

const validateSale = (req, res, next) => {
  const atributes = req.body;

  const verifySale = atributes
    .map(({ productId, quantity }) => SALE.validate({ productId, quantity }))
    .find(({ error }) => error);
  
  if (verifySale) {
    const { error } = verifySale;
    const HTTP_STATUS = error.details[0].type === 'any.required'
      ? HTTP_BAD_REEQUEST_STATUS
      : HTTP_UNPROCESSABLE_ENTITY_STATUS;

    return res.status(HTTP_STATUS).json({ message: error.message });
  }

  next();
};

module.exports = validateSale;