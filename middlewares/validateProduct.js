const Joi = require('joi');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../utils/status-HTTP');

const PRODUCTS = Joi.object({
  name: Joi.string().min(5).max(30).required()
    .messages({
      required: '"name" is required',
      pattern: '"name" length must be at least 5 characters long',
    }),
  quantity: Joi.number().min(1).required()
    .messages({
      required: '"quantity" is required',
      pattern: '"quantity" must be greater than or equal to 1',
    }),
});

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCTS.validate({ name, quantity });

  if (error) {
    const HTTP_STATUS = error.details[0].type === 'any.required'
      ? HTTP_BAD_REEQUEST_STATUS
      : HTTP_UNPROCESSABLE_ENTITY_STATUS;

    return res.status(HTTP_STATUS).json({ message: error.message });
  }

  next();
};

module.exports = validateProduct;