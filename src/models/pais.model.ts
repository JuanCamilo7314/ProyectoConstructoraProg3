import {Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model()
export class Pais extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CodigoP?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreP: string;

  @hasMany(() => Ciudad)
  ciudades: Ciudad[];

  constructor(data?: Partial<Pais>) {
    super(data);
  }
}

export interface PaisRelations {
  // describe navigational properties here
}

export type PaisWithRelations = Pais & PaisRelations;
