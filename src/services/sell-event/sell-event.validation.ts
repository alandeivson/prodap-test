import Joi from "joi";
import validate from "feathers-validate-joi";

const sellEventSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    soldTime: Joi.date().required(),
    quantitySold: Joi.number().integer().min(0),
  })
);

export default validate.mongoose(sellEventSchema, { abortEarly: false });
