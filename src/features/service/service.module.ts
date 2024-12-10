import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SERVICE_MODEL_NAME, serviceModel } from './domain';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SERVICE_MODEL_NAME, schema: serviceModel.schema },
    ]),
  ],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
