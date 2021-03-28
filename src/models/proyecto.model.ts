import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Bloque} from './bloque.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_id',
        entity: 'Ciudad',
        entityKey: 'CodigoC',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Proyecto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CodigoProy?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreProy: string;

  @property({
    type: 'string',
    required: true,
  })
  DescripcionProy: string;

  @property({
    type: 'string',
    required: true,
  })
  DImagen: string;

  @belongsTo(() => Ciudad, {name: 'ciudad'})
  ciudadId: number;

  @hasMany(() => Bloque)
  bloques: Bloque[];

  constructor(data?: Partial<Proyecto>) {
    super(data);
  }
}

export interface ProyectoRelations {
  // describe navigational properties here
}

export type ProyectoWithRelations = Proyecto & ProyectoRelations;
