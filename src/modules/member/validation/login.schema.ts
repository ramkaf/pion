import Joi from "joi";

export const memberLoginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })