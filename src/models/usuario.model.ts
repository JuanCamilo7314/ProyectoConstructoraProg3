import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdUsuario?: number;

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
    type: 'number',
    required: true,
  })
  TelefonoU: number;

  @property({
    type: 'string',
  })
  Clave?: string;


  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
