import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import envConfig from './config'

@Injectable()
export class AppService {

  constructor( 
    @Inject('TAKS') private tasks: any[],
    @Inject(envConfig.KEY) private config: ConfigType<typeof envConfig>,
  ){}

  getHello(): string {
    console.log(this.tasks)
    console.log(`Desde Config: ${this.config.apiKey}`)
    console.log(`Database: ${ this.config.database.name }`)
    return `Hello ${this.config.apiKey}`
  }
}
