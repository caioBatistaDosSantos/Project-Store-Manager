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
  const { productId, quantity } = req.body;

  const { error } = SALE.validate({ productId, quantity });

  const HTTP_STATUS = error.details[0].type === 'any.required'
    ? HTTP_BAD_REEQUEST_STATUS
    : HTTP_UNPROCESSABLE_ENTITY_STATUS;
  
  if (error) res.status(HTTP_STATUS).json({ message: error.message });

  next();
};

module.exports = validateSale;