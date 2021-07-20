import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id: {
        name: 'fk_solicitud_id',
        entity: 'SolicitudCli',
        entityKey: 'IdSolicitud',
        foreignKey: 'solicitudCliId',
      },
    },
  },
})
export class Pagos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  imagenRecibo: string;

  @property({
    type: 'number',
  })
  solicitudCliId?: number;

  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
