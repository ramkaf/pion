import Joi from "joi";

export const courseCreateSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.base': `"title" should be a type of 'text'`,
      'string.empty': `"title" cannot be empty`,
      'string.min': `"title" should have a minimum length of 3 characters`,
      'string.max': `"title" should have a maximum length of 100 characters`,
      'any.required': `"title" is a required field`
    }),
    description: Joi.string().min(5).max(500).required().messages({
      'string.base': `"description" should be a type of 'text'`,
      'string.empty': `"description" cannot be empty`,
      'string.min': `"description" should have a minimum length of 5 characters`,
      'string.max': `"description" should have a maximum length of 500 characters`,
      'any.required': `"description" is a required field`
    }),
    capacity: Joi.number().integer().min(1).required().messages({
      'number.base': `"capacity" should be a number`,
      'number.integer': `"capacity" should be an integer`,
      'number.min': `"capacity" should be at least 1`,
      'any.required': `"capacity" is a required field`
    })
  });