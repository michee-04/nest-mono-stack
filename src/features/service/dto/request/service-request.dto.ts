import * as Joi from 'joi';

export const createServiceRequestDto: Joi.ObjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  slug: Joi.string().required(),
  description: Joi.string().min(3).optional(),
  status: Joi.string().valid('draft', 'active', 'archived', 'deprecated'),
  categoriy: Joi.string().valid('papier', 'citoyen', '^particulier').optional(),
  subCategory: Joi.string().valid('XPortal', 'Sandbox').optional(),
  access: Joi.object({
    groups: Joi.string().valid('admins', 'managers'),
    roles: Joi.string().valid('admin', 'editor'),
  }),
  target: Joi.string().valid('compte', 'mixte', 'particulier', 'professionnel'),
  version: Joi.number().optional(),
  dependenciesService: Joi.any(),
  _id: Joi.any(),
  updatedBy: Joi.any(),
  createdAt: Joi.any(),
  deletedAt: Joi.any(),
  deletedBy: Joi.any(),
  createdBy: Joi.any(),
});
