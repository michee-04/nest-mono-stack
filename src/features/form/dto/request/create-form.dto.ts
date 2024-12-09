import * as Joi from 'joi';

export const CreateFormRequestDto: Joi.ObjectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  label: Joi.string().optional(),
  slug: Joi.string().optional(),
  slugger: Joi.string().optional(),
  description: Joi.string().optional(),
  components: Joi.array(),
  group: Joi.string().optional(),
  version: Joi.number().optional(),
  display: Joi.string().optional(),
  subForm: Joi.string().optional(),
});
