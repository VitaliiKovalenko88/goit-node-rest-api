import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi
    .string()
    .min(3)
    .max(30)
    .required(),
  email: Joi
    .string()
    .email(),
  phone: Joi
    .string()
    .min(3)
    .max(10)
    .required()
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