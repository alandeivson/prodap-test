import Joi from "joi";
import validate from "feathers-validate-joi";

const withdrawalSchema = Joi.array().items(
  Joi.object({
    _id: Joi.string().required(),
    quantity: Joi.number().integer().positive(),
  })
);

export default validate.mongoose(withdrawalSchema, { abortEarly: false });
