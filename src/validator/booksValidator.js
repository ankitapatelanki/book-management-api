const Joi = require('joi');

const bookValidator = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(100).required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().positive().required()
});

module.exports = bookValidator;