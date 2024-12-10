import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IServiceModel } from './domain';
import { ServiceRepository } from './repository';

@Injectable()
export class ServiceService extends BaseService<
  IServiceModel,
  ServiceRepository
> {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<IServiceModel>,
  ) {
    const serviceRepo = new ServiceRepository(serviceModel);
    super(serviceRepo, {
      filter: {
        allowedFields: ['category', 'subCategory', 'groups'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['name', 'slug', 'description', 'status'],
        caseSensitive: false,
        fuzzySearch: true,
      },
      populate: {
        fields: [],
        defaultPopulate: false,
      },
    });
  }
}
