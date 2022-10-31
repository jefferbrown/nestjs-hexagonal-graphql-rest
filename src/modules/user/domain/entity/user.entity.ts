import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../../ui/abstracts/base-constructor.abstract';
import { UserInterface } from '../interface';

@ObjectType()
@Index(['first_name', 'last_name'])
@Entity('users')
export class UserEntity
  extends AbstractEntity<UserInterface>
  implements UserInterface
{
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field({ nullable: true })
  @Index()
  @Column({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  @Index()
  @Column({ nullable: true })
  last_name?: string;
}
