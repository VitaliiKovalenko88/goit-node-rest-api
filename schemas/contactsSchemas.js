import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi
    .string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Body must have at least one field name" }),
  email: Joi
    .string()
    .email()
    .messages({ "any.required": "Body must have at least one field email" })
    .required(),
  phone: Joi
    .string()
    .min(3)
    .max(15)
    .messages({ "any.required": "Body must have at least one field phone" })
    .required(),
})

export const updateContactSchema = Joi.object({
  name: Joi
    .string()
    .min(3)
    .max(30),
  email: Joi
    .string()
    .email(),
  phone: Joi
    .string()
    .min(3)
    .max(10)
})