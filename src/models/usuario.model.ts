import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Rol} from './rol.model';

@model({
  settings: {
    foreignKeys: {
      fk_rol_id: {
        name: 'fk_rol_id',
        entity: 'Rol',
        entityKey: 'IdR',
        foreignKey: 'rolId',
      },
    },
  },
})
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  IdUsuario?: string;

  @property({
    type: 'string',
    required: true,
  })
  DocumentoU: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreU: string;

  @property({
    type: 'string',
    required: true,
  })
  ApellidoU: string;

  @property({
    type: 'string',
    required: true,
  })
  EmailU: string;

  @property({
    type: 'string',
    required: true,
  })
  TelefonoU: string;

  @property({
    type: 'string',
  })
  Clave?: string;

  @belongsTo(() => Rol)
  rolId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
