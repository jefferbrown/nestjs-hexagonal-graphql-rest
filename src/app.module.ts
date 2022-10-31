import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { UserUseCasesModule } from './modules';
import { UserController } from './modules/user/infrastructure/controllers';
import { NestHttpExceptionFilter } from './shared/exception/exception-filter/NestHttpExceptionFilter';
import { PostgresDataServicesModule } from './ui';

@Module({
  imports: [
    ConfigurationModule,
    UserUseCasesModule,
    PostgresDataServicesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        cors: true,
        autoSchemaFile: configurationService.isLocalEnvironment
          ? 'schema.gql'
          : true,
        formatError: (
          err: any,
        ): {
          code: number;
          message: string;
          data: any;
        } => {
          return {
            code: err.extensions?.exception?.code,
            message: err.extensions,
            data: err.extensions?.exception?.data || null,
          };
        },
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
