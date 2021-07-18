import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {Usuario} from './usuario.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_id: {
        name: 'fk_cliente_idd',
        entity: 'Cliente',
        entityKey: 'IdCliente',
        foreignKey: 'clienteId',
      },
      fk_inmueble_id: {
        name: 'fk_inmueble_idd',
        entity: 'Inmueble',
        entityKey: 'CodigoIn',
        foreignKey: 'inmuebleId',
      },
      fk_usuario_id: {
        name: 'fk_usuario_idd',
        entity: 'Usuario',
        entityKey: 'IdUsuario',
        foreignKey: 'usuarioId',
      },
    },
  },
})
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

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Inmueble)
  inmuebleId: number;

  @belongsTo(() => Usuario)
  usuarioId: number;

  constructor(data?: Partial<SolicitudCli>) {
    super(data);
  }
}

export interface SolicitudCliRelations {
  // describe navigational properties here
}

export type SolicitudCliWithRelations = SolicitudCli & SolicitudCliRelations;
