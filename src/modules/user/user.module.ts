import { Module } from '@nestjs/common';

import { PostgresDataServicesModule } from 'src/ui';
import { UserUseCases } from './app/user.use-case';
import { UserFactoryService } from './domain/services/user-factory.service';
import { UserResolver } from './infrastructure/resolvers/user-resolver';

@Module({
  imports: [PostgresDataServicesModule],
  providers: [UserFactoryService, UserUseCases, UserResolver],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}
