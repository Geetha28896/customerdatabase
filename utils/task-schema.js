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

exports.validateTask1 = (myProduct) => Joi.validate(myProduct, prodSchema);
exports.validateTask2= (myOrders) => Joi.validate( myOrders, orderSchema);
