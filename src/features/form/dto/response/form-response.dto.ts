import * as Joi from 'joi';

export const CreateFormResponseDto: Joi.ObjectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  label: Joi.string().required(),
  description: Joi.string(),
  components: Joi.array(),
});
