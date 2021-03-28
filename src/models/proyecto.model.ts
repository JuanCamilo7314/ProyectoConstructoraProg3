import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Proyecto>) {
    super(data);
  }
}

export interface ProyectoRelations {
  // describe navigational properties here
}

export type ProyectoWithRelations = Proyecto & ProyectoRelations;
