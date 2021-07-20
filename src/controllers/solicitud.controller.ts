import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SolicitudCli} from '../models';
import {ClienteRepository, InmuebleRepository, SolicitudCliRepository} from '../repositories';
import {NotificacionService} from '../services';

export class SolicitudController {
  constructor(
    @repository(SolicitudCliRepository)
    public solicitudCliRepository: SolicitudCliRepository,
    @repository(InmuebleRepository)
    public InmuebleRepository: InmuebleRepository,
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
  ) { }

  @post('/solicitud')
  @response(200, {
    description: 'SolicitudCli model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudCli)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudCli, {
            title: 'NewSolicitudCli',
            exclude: ['IdSolicitud'],
          }),
        },
      },
    })
    solicitudCli: Omit<SolicitudCli, 'IdSolicitud'>,
  ): Promise<SolicitudCli> {

    return this.solicitudCliRepository.create(solicitudCli);
  }

  @get('/solicitud/count')
  @response(200, {
    description: 'SolicitudCli model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudCli) where?: Where<SolicitudCli>,
  ): Promise<Count> {
    return this.solicitudCliRepository.count(where);
  }

  @get('/solicitud')
  @response(200, {
    description: 'Array of SolicitudCli model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudCli, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudCli) filter?: Filter<SolicitudCli>,
  ): Promise<SolicitudCli[]> {
    return this.solicitudCliRepository.find(filter);
  }

  @patch('/solicitud')
  @response(200, {
    description: 'SolicitudCli PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudCli, {partial: true}),
        },
      },
    })
    solicitudCli: SolicitudCli,
    @param.where(SolicitudCli) where?: Where<SolicitudCli>,
  ): Promise<Count> {
    return this.solicitudCliRepository.updateAll(solicitudCli, where);
  }

  @get('/solicitud/{id}')
  @response(200, {
    description: 'SolicitudCli model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudCli, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudCli, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudCli>
  ): Promise<SolicitudCli> {
    return this.solicitudCliRepository.findById(id, filter);
  }

  @patch('/solicitud/{id}')
  @response(204, {
    description: 'SolicitudCli PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudCli, {partial: true}),
        },
      },
    })
    solicitudCli: SolicitudCli,
  ): Promise<void> {
    await this.solicitudCliRepository.updateById(id, solicitudCli);
  }

  @put('/solicitud/{id}')
  @response(204, {
    description: 'SolicitudCli PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudCli: SolicitudCli,
  ): Promise<void> {

    //Notificar al cliente
    if (solicitudCli.EstadoSolicitud == 'Aceptada') {
      let inmueble = await this.InmuebleRepository.findOne({where: {CodigoIn: solicitudCli.inmuebleId}})
      if (!inmueble) {
        throw new HttpErrors[403]("No se encuentra el inmueble para notificar.")
      }
      let cliente = await this.ClienteRepository.findOne({where: {IdCliente: solicitudCli.clienteId}})
      if (!cliente) {
        throw new HttpErrors[403]("No se encuentra el cliente para notificar.")
      }
      let asunto = 'Solicitud Aceptada'
      let contenido = `<strong>Hola, buen dia</strong><br />su solicitud del inmuble ${inmueble.NombreIn} ha sido ACEPTADA en el sistemas de UdeC S.A.S. :P :) `
      this.servicioNotificacion.EnviarEmail(cliente.EmailCli, asunto, contenido);
    }
    if (solicitudCli.EstadoSolicitud == 'Cancelada') {
      let inmueble = await this.InmuebleRepository.findOne({where: {CodigoIn: solicitudCli.inmuebleId}})
      if (!inmueble) {
        throw new HttpErrors[403]("No se encuentra el inmueble para notificar.")
      }
      let cliente = await this.ClienteRepository.findOne({where: {IdCliente: solicitudCli.clienteId}})
      if (!cliente) {
        throw new HttpErrors[403]("No se encuentra el cliente para notificar.")
      }
      let asunto = 'Solicitud Negada'
      let contenido = `<strong>Hola, buen dia</strong><br />su solicitud del inmuble ${inmueble.NombreIn} ha sido NEGADA en el sistemas de UdeC S.A.S. :P :) `
      this.servicioNotificacion.EnviarEmail(cliente.EmailCli, asunto, contenido);
    }

    await this.solicitudCliRepository.replaceById(id, solicitudCli);
  }

  @del('/solicitud/{id}')
  @response(204, {
    description: 'SolicitudCli DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudCliRepository.deleteById(id);
  }
}
