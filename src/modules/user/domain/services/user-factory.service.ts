import { Injectable } from '@nestjs/common';
import { IDataServicesPostgres } from 'src/ui/abstracts';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entity';
import { GetUserByIdInput } from '../input';

@Injectable()
export class UserFactoryService {
  constructor(private dataServices: IDataServicesPostgres) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.dataServices.users.getAll();
  }
  createNewUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newPhotographer = new UserEntity(createUserDto);
    return this.dataServices.users.create(newPhotographer);
  }

  getUserById(getUserByIdInput: GetUserByIdInput): Promise<UserEntity> {
    const newPhotographer = new UserEntity(getUserByIdInput);
    return this.dataServices.users.getById(newPhotographer, 'Photographer');
  }
  updateUser(userID, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const getUser = new UserEntity(userID);
    const updateUser = new UserEntity(updateUserDto);
    return this.dataServices.users.update(getUser, updateUser, 'User');
  }

  async deleteUser(userID): Promise<any> {
    return this.dataServices.users.delete(userID, 'User');
  }
}
