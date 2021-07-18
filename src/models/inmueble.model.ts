import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_id: {
        name: 'fk_bloque_idd',
        entity: 'Bloque',
        entityKey: 'CodigoB',
        foreignKey: 'bloqueId',
      },
    },
  },
})
export class Inmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CodigoIn?: number;

  @property({
    type: 'string',
    required: true,
  })
  Identificador: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreIn: string;

  @property({
    type: 'number',
    required: true,
  })
  ValorIn: number;

  @belongsTo(() => Bloque)
  bloqueId: number;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
