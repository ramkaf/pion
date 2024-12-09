import Joi from "joi";

export const memberUpdateschema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
    .required()
    .messages({
      "string.base": `"id" should be a type of 'text'`,
      "string.empty": `"id" cannot be empty`,
      "string.pattern.base": `"id" must be a valid MongoDB ObjectId (24 hex characters)`,
      "any.required": `"id" is a required field`,
    }),
  firstname: Joi.string().min(1).optional().messages({
    "string.base": "First name should be a type of text",
    "string.empty": "First name is required",
  }),
  lastname: Joi.string().min(1).optional().messages({
    "string.base": "Last name should be a type of text",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\];:"<>,.?\/\\|~`-]).{8,}$/,
    )
    .optional()
    .messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password is required",
      "string.min": "Password should have a minimum length of 8",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  birthday: Joi.date().optional().messages({
    "date.base": "Birthday should be a valid date",
    "any.required": "Birthday is required",
  }),
  phonenumber: Joi.string()
    .pattern(/^(\+98|0)9\d{9}$/)
    .optional()
    .messages({
      "string.base": "Phone number should be a type of text",
      "string.empty": "Phone number is required",
      "string.pattern.base":
        "Phone number must be a valid Iranian phone number (e.g. +98xxxxxxxxx or 09xxxxxxxxx)",
      "any.required": "Phone number is required",
    }),
});
