import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, ViewConfig } from './config';
import { FormModule } from './features/form/form.module';
import { HomeModule } from './features/home/home.module';
import { PostsModule } from './features/posts/posts.module';
import { ServiceModule } from './features/service/service.module';
import { UserModule } from './features/user/user.module';
import { WorkflowModule } from './features/workflow/workflow.module';
import { ViewService } from './infrastructure/view/view.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, ViewConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('app.mongoUri'),
      }),
      inject: [ConfigService],
    }),

    HomeModule,
    PostsModule,
    FormModule,
    WorkflowModule,
    UserModule,
    ServiceModule,
  ],
  providers: [ViewService],
})
export class AppModule {}
