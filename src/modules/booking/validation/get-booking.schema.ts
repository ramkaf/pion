import Joi from "joi";

export const bookingGetOneSchema = Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
      .optional()
      .messages({
        'string.base': `"id" should be a type of 'text'`,
        'string.empty': `"id" cannot be empty`,
        'string.pattern.base': `"id" must be a valid MongoDB ObjectId (24 hex characters)`,
      })
  });export const bookingGetOneByIdSchema = Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
      .required()
      .messages({
        'string.base': `"id" should be a type of 'text'`,
        'string.empty': `"id" cannot be empty`,
        'string.pattern.base': `"id" must be a valid MongoDB ObjectId (24 hex characters)`,
      })

  });