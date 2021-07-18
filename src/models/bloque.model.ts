import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Proyecto} from './proyecto.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyecto_id: {
        name: 'fk_proyecto_idd',
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
