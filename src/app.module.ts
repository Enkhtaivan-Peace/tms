import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './features/iam/iam.module';
import { LoggerModule } from 'nestjs-pino';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DepartmentModule } from './features/org/department/department.module';
import { TeamModule } from './features/org/team/team.module';
import { WorkItemModule } from './features/work/work.module';
import { WorkTypeModule } from './features/work/work-type/work-type.module';
import { WorkCategoryModule } from './features/work/work-category/work-category.module';
import { WorkStatusModule } from './features/work/work-status/work-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },

        level: 'info',

        autoLogging: true,
      },
    }),

    IamModule,
    DepartmentModule,
    TeamModule,
    WorkItemModule,
    WorkTypeModule,
    WorkCategoryModule,
    WorkStatusModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
