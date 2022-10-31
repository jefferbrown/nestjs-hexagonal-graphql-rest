import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserUseCases } from '../../app/user.use-case';
import { GetUserByIdInput } from '../../domain';
import { UserEntity } from '../../domain/entity';

@Resolver(() => UserEntity)
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private userUseCases: UserUseCases) {}

  // @Query(() => UserPaginated)
  // async getAllUsers(
  //   @Args('filters', { nullable: true }) filters?: FiltersExpression,
  //   @Args('ordination', { nullable: true })
  //   orderBy?: FiltersExpressionOrderBy,
  //   @Args() pagination?: PaginationArgs,
  // ) {
  //   return this.userUseCases.getAllUsers(filters, orderBy, pagination);
  // }

  // @Mutation(() => UserEntity)
  // async createUser(@Args('input') data: CreateUserInput): Promise<UserEntity> {
  //   return this.userUseCases.createUser(data);
  // }

  @Query(() => UserEntity)
  async getUserById(@Args('id') id: GetUserByIdInput): Promise<UserEntity> {
    return this.userUseCases.getUserById(id);
  }

  // @Mutation(() => UserEntity)
  // async updateUser(
  //   @Args('id') id: UpdateUserInput,
  //   @Args('data') data: CreateUserInput,
  // ): Promise<UserEntity> {
  //   return this.userUseCases.updateUser(id, data);
  // }

  // @Mutation(() => String)
  // async deleteUser(@Args('id') id: DeleteUserInput): Promise<string> {
  //   await this.userUseCases.deleteUser(id);
  //   return 'User remove';
  // }
}
