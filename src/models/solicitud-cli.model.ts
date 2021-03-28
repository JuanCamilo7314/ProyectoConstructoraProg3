import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudCli extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  FechaSolicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  OfertaEconomica: number;

  @property({
    type: 'string',
    required: true,
  })
  EstadoSolicitud: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdSolicitud?: number;


  constructor(data?: Partial<SolicitudCli>) {
    super(data);
  }
}

export interface SolicitudCliRelations {
  // describe navigational properties here
}

export type SolicitudCliWithRelations = SolicitudCli & SolicitudCliRelations;
