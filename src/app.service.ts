import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): any {
    return {
      global: {
        enviroment: process.env.NODE_ENV,
        apiKey: this.configService.apiKey,
        database: this.configService.database,
      },
      injectable: `Hello World! ${this.apiKey}`,
      tasks: this.tasks,
    };
  }
}
