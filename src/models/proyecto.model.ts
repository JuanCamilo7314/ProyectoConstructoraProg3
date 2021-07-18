import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudadP_id',
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
