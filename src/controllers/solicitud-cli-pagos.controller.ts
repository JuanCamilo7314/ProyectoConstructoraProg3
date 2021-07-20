import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SolicitudCli,
  Pagos,
} from '../models';
import {SolicitudCliRepository} from '../repositories';

export class SolicitudCliPagosController {
  constructor(
    @repository(SolicitudCliRepository) protected solicitudCliRepository: SolicitudCliRepository,
  ) { }

  @get('/solicitud-clis/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudCli has one Pagos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pagos),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pagos>,
  ): Promise<Pagos> {
    return this.solicitudCliRepository.pagos(id).get(filter);
  }

  @post('/solicitud-clis/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudCli model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SolicitudCli.prototype.IdSolicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {
            title: 'NewPagosInSolicitudCli',
            exclude: ['id'],
            optional: ['solicitudCliId']
          }),
        },
      },
    }) pagos: Omit<Pagos, 'id'>,
  ): Promise<Pagos> {
    return this.solicitudCliRepository.pagos(id).create(pagos);
  }

  @patch('/solicitud-clis/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudCli.Pagos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Partial<Pagos>,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudCliRepository.pagos(id).patch(pagos, where);
  }

  @del('/solicitud-clis/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudCli.Pagos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudCliRepository.pagos(id).delete(where);
  }
}
