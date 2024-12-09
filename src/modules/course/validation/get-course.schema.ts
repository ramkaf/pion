import Joi from "joi";

export const courseGetOneSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
    .optional()
    .messages({
      "string.base": `"id" should be a type of 'text'`,
      "string.empty": `"id" cannot be empty`,
      "string.pattern.base": `"id" must be a valid MongoDB ObjectId (24 hex characters)`,
    }),
});
