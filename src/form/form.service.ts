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
        targetField: 'slugger', // target field name...this will be used to create the slug and put in the slugger field of the document
      },
      search: {
        enabled: true,
        fields: ['title', 'description', 'label'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [],
        defaultPopulate: false,
      },
    });
  }
}
