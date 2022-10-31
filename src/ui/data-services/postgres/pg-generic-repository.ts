import { Logger } from '@nestjs/common';
import { Code } from 'src/shared/code/Code';
import { Exception } from 'src/shared/exception/Exception';
import { CoreAssert } from 'src/shared/util';
import { IGenericRepository } from 'src/ui/abstracts';
import { DeleteResult, Repository } from 'typeorm';

export class PostgresGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async getAll(): Promise<T[]> {
    const getData: T[] = CoreAssert.notEmpty(
      await this._repository.find(),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: `Data not found.`,
      }),
    );

    return getData;
  }

  async getById(id, messageError: string): Promise<T> {
    const getData: T = CoreAssert.notEmpty(
      await this._repository.findOne({
        where: id,
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: `${messageError} not found.`,
      }),
    );

    return getData;
  }

  async create(item: T): Promise<T> {
    return this._repository.save(item);
  }
  async update(id, item, messageError: string): Promise<T> {
    CoreAssert.notEmpty(
      await this._repository.findOne({
        where: id,
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: `${messageError} not found.`,
      }),
    );

    await this._repository.update(id, item);
    return this._repository.findOne({
      where: id,
    });
  }

  async delete(id: any, messageError: string): Promise<DeleteResult> {
    const data = CoreAssert.notEmpty(
      await this._repository.find({
        where: id,
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: `${messageError} not found.`,
      }),
    );
    Logger.log(data, 'Find user');
    return this._repository.delete(id);
  }
}
