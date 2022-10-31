import { BaseEntity } from 'typeorm';

export abstract class AbstractEntity<T> extends BaseEntity {
  constructor(obj?: T) {
    super();
    Object.assign(this, obj);
  }
}
