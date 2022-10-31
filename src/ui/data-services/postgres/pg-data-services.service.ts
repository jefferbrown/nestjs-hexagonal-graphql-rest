import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataServicesPostgres } from 'src/ui/abstracts';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../modules/user/domain/entity';
import { PostgresGenericRepository } from './pg-generic-repository';

@Injectable()
export class PostgresDataServices
  implements IDataServicesPostgres, OnApplicationBootstrap
{
  users: PostgresGenericRepository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  onApplicationBootstrap() {
    this.users = new PostgresGenericRepository<UserEntity>(this.userEntity);
  }
}
