import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proyecto} from './proyecto.model';
import {Inmueble} from './inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyecto_id: {
        name: 'fk_proyecto_id',
        entity: 'Proyecto',
        entityKey: 'CodigoProy',
        foreignKey: 'proyectoId',
      },
    },
  },
})
export class Bloque extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CodigoB?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreB: string;

  @belongsTo(() => Proyecto)
  proyectoId: number;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  constructor(data?: Partial<Bloque>) {
    super(data);
  }
}

export interface BloqueRelations {
  // describe navigational properties here
}

export type BloqueWithRelations = Bloque & BloqueRelations;
