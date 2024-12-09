import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IWorkflowModel } from '../domain';

export class WorkflowRepository extends BaseRepository<IWorkflowModel> {
  constructor(model: Model<IWorkflowModel>) {
    super(model);
  }
}
