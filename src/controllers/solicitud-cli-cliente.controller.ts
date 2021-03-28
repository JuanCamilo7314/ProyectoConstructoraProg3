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
  Cliente,
} from '../models';
import {SolicitudCliRepository} from '../repositories';

export class SolicitudCliClienteController {
  constructor(
    @repository(SolicitudCliRepository)
    public solicitudCliRepository: SolicitudCliRepository,
  ) { }

  @get('/solicitud-clis/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to SolicitudCli',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof SolicitudCli.prototype.IdSolicitud,
  ): Promise<Cliente> {
    return this.solicitudCliRepository.cliente(id);
  }
}
