import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IServiceModel } from '../domain';

export class ServiceRepository extends BaseRepository<IServiceModel> {
  constructor(model: Model<IServiceModel>) {
    super(model);
  }
}
