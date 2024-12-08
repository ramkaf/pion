import Joi from "joi";

export const createBookingSchema = Joi.object({
  course: Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
  .required()
  .messages({
    'string.base': `"courseid" should be a type of 'text'`,
    'string.empty': `"courseid" cannot be empty`,
    'string.pattern.base': `"courseid" must be a valid MongoDB ObjectId (24 hex characters)`,
     'any.required': `"courseid" is a required field`
  }),
});
