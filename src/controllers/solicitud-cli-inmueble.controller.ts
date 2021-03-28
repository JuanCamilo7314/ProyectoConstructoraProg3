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
  Inmueble,
} from '../models';
import {SolicitudCliRepository} from '../repositories';

export class SolicitudCliInmuebleController {
  constructor(
    @repository(SolicitudCliRepository)
    public solicitudCliRepository: SolicitudCliRepository,
  ) { }

  @get('/solicitud-clis/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to SolicitudCli',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.number('id') id: typeof SolicitudCli.prototype.IdSolicitud,
  ): Promise<Inmueble> {
    return this.solicitudCliRepository.inmueble(id);
  }
}
