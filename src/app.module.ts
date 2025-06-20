import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { HttpModule, HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import * as Joi from 'joi'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import envConfig from './config'



@Module({
  imports: [
    UsersModule, 
    ProductsModule, 
    HttpModule, 
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [ envConfig ],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        ENVIRONMENT: Joi.string(),
      })
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TAKS',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/todos')
        const tasks = await lastValueFrom(req)
        return tasks.data
      },
      inject: [ HttpService ]
    }
    
  ],

})
export class AppModule {}
