import Joi from "joi";

export const courseUpdateSchema = Joi.object({
    id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
    .required()
    .messages({
      'string.base': `"id" should be a type of 'text'`,
      'string.empty': `"id" cannot be empty`,
      'string.pattern.base': `"id" must be a valid MongoDB ObjectId (24 hex characters)`,
       'any.required': `"id" is a required field`
    }),
    title: Joi.string().min(3).max(100).optional().messages({
      'string.base': `"title" should be a type of 'text'`,
      'string.empty': `"title" cannot be empty`,
      'string.min': `"title" should have a minimum length of 3 characters`,
      'string.max': `"title" should have a maximum length of 100 characters`,
    }),
    description: Joi.string().min(5).max(500).optional().messages({
      'string.base': `"description" should be a type of 'text'`,
      'string.empty': `"description" cannot be empty`,
      'string.min': `"description" should have a minimum length of 5 characters`,
      'string.max': `"description" should have a maximum length of 500 characters`,
    }),
    capacity: Joi.number().integer().min(1).optional().messages({
      'number.base': `"capacity" should be a number`,
      'number.integer': `"capacity" should be an integer`,
      'number.min': `"capacity" should be at least 1`,
    })
  });