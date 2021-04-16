import {Model, model, property} from '@loopback/repository';

@model()
export class CambiarClave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  EmailU: string;

  @property({
    type: 'string',
    required: true,
  })
  ClaveActual: string;

  @property({
    type: 'string',
    required: true,
  })
  ClaveNueva: string;


  constructor(data?: Partial<CambiarClave>) {
    super(data);
  }
}

export interface CambiarClaveRelations {
  // describe navigational properties here
}

export type CambiarClaveWithRelations = CambiarClave & CambiarClaveRelations;
