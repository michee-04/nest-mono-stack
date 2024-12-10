import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IService {
  name: string;
  slug: string;
  description: string;
  status: string;
  category: string;
  subCategory: string;
  access: string;
  target: string;
  version: number;
  dependenciesService: any;
}

export interface IServiceModel extends IService, IBaseModel, Document {}
