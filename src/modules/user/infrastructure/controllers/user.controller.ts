import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/shared/response/CoreApiResponse';
import { UserUseCases } from '../../app/user.use-case';
import { UserEntity } from '../../domain/entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async getUser(@Param() userId): Promise<CoreApiResponse<UserEntity>> {
    try {
      const dataResponse = await this.userUseCases.getUserById(userId);
      return CoreApiResponse.success(dataResponse);
    } catch (error) {
      throw error;
    }
  }
}
