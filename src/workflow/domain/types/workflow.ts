import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export type WORKFLOWTAG = 'approval' | 'finance';

export interface IWorkflow {
  title: string;
  slug: string;
  description: string;
  service: string;
  schemas: any;
  access: any;
  version: number;
  active: boolean;
  tag: WORKFLOWTAG;
  status: string;
}

export interface IWorkflowModel extends IWorkflow, IBaseModel, Document {}
