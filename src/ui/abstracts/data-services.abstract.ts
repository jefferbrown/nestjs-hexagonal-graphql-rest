import { UserEntity } from 'src/modules/user/domain/entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServicesPostgres {
  abstract users: IGenericRepository<UserEntity>;
}
