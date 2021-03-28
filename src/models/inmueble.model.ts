import {Entity, model, property} from '@loopback/repository';

@model()
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



  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
