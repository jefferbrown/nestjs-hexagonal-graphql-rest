import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  DeleteUserByIdDto,
  GetUserByIdDto,
  UpdateUserByIdDto,
  UpdateUserDto,
} from '../domain';
import { UserEntity } from '../domain/entity';
import { UserFactoryService } from '../domain/services/user-factory.service';

@Injectable()
export class UserUseCases {
  //if you use postgres change name dataService *IDataServicesPostgres*
  constructor(private photographerFactoryService: UserFactoryService) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.photographerFactoryService.getAllUsers();
  }

  async createUser(createPhotographerDto: CreateUserDto): Promise<UserEntity> {
    return this.photographerFactoryService.createNewUser(createPhotographerDto);
  }

  async getUserById(id: GetUserByIdDto): Promise<UserEntity> {
    return this.photographerFactoryService.getUserById(id);
  }

  async updateUser(
    photographerId: UpdateUserByIdDto,
    updatePhotographerDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.photographerFactoryService.updateUser(
      photographerId,
      updatePhotographerDto,
    );
  }
  async deleteUser(photographerDto: DeleteUserByIdDto): Promise<UserEntity> {
    return this.photographerFactoryService.deleteUser(photographerDto);
  }
}
