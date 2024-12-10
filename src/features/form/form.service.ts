import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IFormModel } from './domain';
import { FormRepository } from './repositories';

@Injectable()
export class FormService extends BaseService<IFormModel, FormRepository> {
  constructor(
    @InjectModel('Form') private readonly formModel: Model<IFormModel>,
  ) {
    const formRepo = new FormRepository(formModel);
    super(formRepo, {
      filter: {
        allowedFields: ['version', 'group'],
        defaultSort: { createdAt: -1 },
      },
      slug: {
        enabled: true,
        sourceField: 'title',
        targetField: 'slugger',
      },
      search: {
        enabled: true,
        fields: ['title', 'description', 'label'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'subForm', select: '_id title description' }],
        defaultPopulate: true,
      },
    });
  }
}
