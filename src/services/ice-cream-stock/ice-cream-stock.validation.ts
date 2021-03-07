import Joi from "joi";
import validate from "feathers-validate-joi";

const iceCreamSchema = Joi.object().keys({
  description: Joi.string().required(),
  stockQuantity: Joi.number().integer().positive(),
  quantityInSale: Joi.number().integer().positive(),
  shelfLife: Joi.number().integer().positive(),
});

export default validate.mongoose(iceCreamSchema, { abortEarly: false });
