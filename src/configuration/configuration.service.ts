import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('template-api.PORT'));
  }

  get DB_HOST(): string {
    return this.configService.get<string>('template-api.DB_HOST');
  }

  get DB_PORT(): number {
    return Number(this.configService.get<string>('template-api.DB_PORT'));
  }

  get DB_USERNAME(): string {
    return this.configService.get<string>('template-api.DB_USERNAME');
  }

  get DB_PASSWORD(): string {
    return this.configService.get<string>('template-api.DB_PASSWORD');
  }

  get DB_NAME(): string {
    return this.configService.get<string>('template-api.DB_NAME');
  }

  get ERRORS_LOG_ENABLE(): string {
    return this.configService.get<string>('template-api.ERRORS_LOG_ENABLE');
  }

  get isLocalEnvironment(): boolean {
    const isLocalEnvironment =
      this.configService.get<string>('template-api.NODE_ENV') !== 'production';
    return isLocalEnvironment;
  }
}
