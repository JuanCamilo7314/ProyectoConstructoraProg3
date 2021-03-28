import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudCli,
  Usuario,
} from '../models';
import {SolicitudCliRepository} from '../repositories';

export class SolicitudCliUsuarioController {
  constructor(
    @repository(SolicitudCliRepository)
    public solicitudCliRepository: SolicitudCliRepository,
  ) { }

  @get('/solicitud-clis/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to SolicitudCli',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof SolicitudCli.prototype.IdSolicitud,
  ): Promise<Usuario> {
    return this.solicitudCliRepository.usuario(id);
  }
}
