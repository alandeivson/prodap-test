import Joi from "joi";
import validate from "feathers-validate-joi";

const withdrawalSchema = Joi.array().items(
  Joi.object({
    _id: Joi.string().required(),
    quantity: Joi.number().integer().min(0),
  })
);

export default validate.mongoose(withdrawalSchema, { abortEarly: false });
