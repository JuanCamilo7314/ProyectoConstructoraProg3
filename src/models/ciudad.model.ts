import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Pais} from './pais.model';
import {Proyecto} from './proyecto.model';

@model({
  settings: {
    foreignKeys: {
      fk_pais_id: {
        name: 'fk_pais_id',
        entity: 'Pais',
        entityKey: 'CodigoP',
        foreignKey: 'paisId',
      },
    },
  },
})
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CodigoC?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreC: string;

  @belongsTo(() => Pais, {name: 'pais'})
  paisId: number;

  @hasMany(() => Proyecto)
  proyectos: Proyecto[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
