import Joi from "joi";

export const updateBookingSchema = Joi.object({
  id: Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
  .required()
  .messages({
    'string.base': `"course-memeber-id" should be a type of 'text'`,
    'string.empty': `"course-memeber-id" cannot be empty`,
    'string.pattern.base': `"course-memeber-id" must be a valid MongoDB ObjectId (24 hex characters)`,
     'any.required': `"course-memeber-id" is a required field`
  }),
  member: Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
  .optional()
  .messages({
    'string.base': `"memeberid" should be a type of 'text'`,
    'string.empty': `"memeberid" cannot be empty`,
    'string.pattern.base': `"memeberid" must be a valid MongoDB ObjectId (24 hex characters)`,
  }),
  course: Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/, 'ObjectId')
  .optional()
  .messages({
    'string.base': `"courseid" should be a type of 'text'`,
    'string.empty': `"courseid" cannot be empty`,
    'string.pattern.base': `"courseid" must be a valid MongoDB ObjectId (24 hex characters)`,
  }),
});
