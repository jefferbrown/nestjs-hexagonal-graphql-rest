import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;
}

export class GetUserByIdDto {
  @IsNumber()
  @IsOptional()
  id: number;
}
export class UpdateUserByIdDto {
  @IsNumber()
  @IsOptional()
  id: number;
}
export class DeleteUserByIdDto {
  @IsNumber()
  @IsOptional()
  id: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
