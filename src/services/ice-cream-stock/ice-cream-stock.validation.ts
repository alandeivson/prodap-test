import Joi from "joi";
import validate from "feathers-validate-joi";

const iceCreamSchema = Joi.object({
  description: Joi.string().required(),
  stockQuantity: Joi.number().integer().min(0),
  quantityInSale: Joi.number().integer().min(0),
  shelfLife: Joi.number().integer().min(0),
});

export default validate.mongoose(iceCreamSchema, { abortEarly: false });
