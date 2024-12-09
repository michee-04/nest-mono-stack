import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WORKFLOW_MODEL_NAME, workflowModel } from './domain';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WORKFLOW_MODEL_NAME, schema: workflowModel.schema },
    ]),
  ],
  providers: [WorkflowService],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
