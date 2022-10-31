import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  first_name?: string;
  @Field({ nullable: true })
  last_name?: string;
}
@InputType()
export class GetUserByIdInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;
}
@InputType()
export class DeleteUserInput {
  @Field(() => Int)
  id: number;
}
