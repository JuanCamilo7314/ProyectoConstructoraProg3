import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_idd',
        entity: 'Ciudad',
        entityKey: 'CodigoC',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Cliente extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdCliente?: number;

  @property({
    type: 'number',
    required: true,
  })
  DocumentoCli: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreCli: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoCli: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaNaciCli: string;

  @property({
    type: 'string',
    required: true,
  })
  DImagenCli: string;

  @property({
    type: 'string',
    required: true,
  })
  TelefonoCli: string;

  @property({
    type: 'string',
    required: true,
  })
  EmailCli: string;

  @property({
    type: 'string',
    required: true,
  })
  DireccionCLi: string;

  @property({
    type: 'number',
    required: true,
  })
  TotIngresosCli: number;

  @property({
    type: 'string',
    required: true,
  })
  DatosTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  TiemTrabajoAcCli: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreRefFamCli: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoRefFamCli: string;

  @property({
    type: 'string',
    required: true,
  })
  TelefonoRefFamCli: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreRefPerCli: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoRefPerCli: string;

  @property({
    type: 'string',
    required: true,
  })
  TelefonoRefPerCli: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
