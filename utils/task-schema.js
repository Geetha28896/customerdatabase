const Joi = require("joi");
const prodSchema = {
  productId: Joi.string().guid({ version: "uuidv4" }),
  product_name: Joi.string().required(),
  price: Joi.number().required(),
  available_quantity: Joi.number().required(),
  description: Joi.string().required(),
  offers: Joi.array().required(),
};

const orderSchema = {
  userId: Joi.number().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  timeStamp:Joi.date().timestamp().required()
};

exports.validateTask = (data1) => Joi.validate(data1, prodSchema);
exports.validateTask = (data2) => Joi.validate(data2, orderSchema);
