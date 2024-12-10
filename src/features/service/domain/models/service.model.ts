import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import mongoose from 'mongoose';
import { IServiceModel } from '../types';

export const SERVICE_MODEL_NAME = 'Service';

const serviceSchema = createBaseSchema<IServiceModel>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived', 'deprecated'],
      default: 'draft',
    },
    category: {
      type: String,
      enum: ['papier', 'citoyen', 'particulier'],
      default: 'papier',
    },
    subCategory: {
      type: String,
      enum: ['XPortal', 'Sandbox'],
      default: 'XPortal',
    },
    access: {
      groups: {
        type: String,
        enum: ['admins', 'managers'],
      },
      roles: {
        type: String,
        enum: ['admin', 'editor'],
      },
    },
    target: {
      type: String,
      enum: ['compte', 'mixte', 'particulier', 'professionnel'],
      default: 'mixte',
    },
    version: {
      type: Number,
    },
    dependenciesService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
  },
  {
    modelName: SERVICE_MODEL_NAME,
  },
);

const serviceModel = new BaseModel<IServiceModel>(
  SERVICE_MODEL_NAME,
  serviceSchema,
).getModel();

export { serviceModel, serviceSchema };
