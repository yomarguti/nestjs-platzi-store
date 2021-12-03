import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  API_KEY: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
});
