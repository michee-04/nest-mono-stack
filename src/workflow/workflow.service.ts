import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IWorkflowModel } from './domain';
import { WorkflowRepository } from './repositories';

@Injectable()
export class WorkflowService extends BaseService<
  IWorkflowModel,
  WorkflowRepository
> {
  constructor(
    @InjectModel('Workflow')
    private readonly workflowModel: Model<IWorkflowModel>,
  ) {
    const workflowRepo = new WorkflowRepository(workflowModel);
    super(workflowRepo);
  }
}
