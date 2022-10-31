export abstract class IGenericRepository<T> {
  abstract getAll();

  abstract create(item: T, messageError?: string);

  abstract getById(id: T, messageError?: string);

  abstract update(id: T, item: T, messageError?: string);

  abstract delete(id: T, messageError?: string);
}
