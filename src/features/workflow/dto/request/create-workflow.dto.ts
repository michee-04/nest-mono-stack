import * as Joi from 'joi';
import {
  IsJsonStringConstraint,
  IsXmlStringConstraint,
} from 'src/shared/validation';

const isJsonValidator = new IsJsonStringConstraint();
const IsXmlValidator = new IsXmlStringConstraint();

export const createWorkflowRequestDto: Joi.ObjectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  service: Joi.string().optional(),
  schemas: Joi.object({
    json: Joi.string().custom((value, helpers) => {
      if (!isJsonValidator.validate(value)) {
        return helpers.error('any.invalid', {
          message: isJsonValidator.defaultMessage(),
        });
      }
      return value;
    }),
    xml: Joi.string()
      .custom((value, helpers) => {
        if (!IsXmlValidator.validate(value)) {
          return helpers.error('any.invalid', {
            message: isJsonValidator.defaultMessage(),
          });
        }

        return value;
      })
      .optional(),
  }).required(),
  form: Joi.object(),
  access: Joi.object({
    groups: Joi.string().valid('admins', 'managers'),
    roles: Joi.string().valid('admin', 'editor'),
  }),
  active: Joi.boolean(),
  version: Joi.number().optional(),
  tag: Joi.string().valid('approval', 'finance').optional(),
  status: Joi.string()
    .valid('draft', 'active', 'archived', 'deprecated')
    .optional(),
  subForm: Joi.string().optional(),
});
