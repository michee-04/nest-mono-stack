import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import mongoose from 'mongoose';
import { IWorkflowModel } from '../types';

export const WORKFLOW_MODEL_NAME = 'Workflow';

const workflowSchema = createBaseSchema<IWorkflowModel>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    schemas: {
      xml: { type: String },
      json: { type: String },
    },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
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
    active: {
      type: Boolean,
    },
    version: {
      type: Number,
    },
    tag: {
      type: String,
      enum: ['approval', 'finance'],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived', 'deprecated'],
      default: 'draft',
    },
  },
  {
    modelName: WORKFLOW_MODEL_NAME,
  },
);

const workflowModel = new BaseModel<IWorkflowModel>(
  WORKFLOW_MODEL_NAME,
  workflowSchema,
).getModel();

export { workflowModel, workflowSchema };
