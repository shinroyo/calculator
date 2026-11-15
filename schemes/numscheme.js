const Joi = require("joi");

const sumSchema = Joi.object({
    num1: Joi.number().max(50).required(),
    num2: Joi.number().max(50).required()
});

module.exports = sumSchema;