import * as Joi from 'joi';

export const createServiceResponseDto: Joi.ObjectSchema = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  description: Joi.string().min(3),
  status: Joi.string().valid('draft', 'active', 'archived', 'deprecated'),
  categoriy: Joi.string().valid('papier', 'citoyen', '^particulier').optional(),
  subCategory: Joi.string().valid('XPortal', 'Sandbox').optional(),
  version: Joi.number().optional(),
  dependenciesService: Joi.any(),
  _id: Joi.any(),
  updatedBy: Joi.any(),
  createdAt: Joi.any(),
  deletedAt: Joi.any(),
  deletedBy: Joi.any(),
  createdBy: Joi.any(),
});
