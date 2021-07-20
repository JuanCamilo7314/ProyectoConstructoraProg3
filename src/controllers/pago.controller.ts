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
import {Pagos} from '../models';
import {ClienteRepository, InmuebleRepository, PagosRepository, SolicitudCliRepository} from '../repositories';
import {NotificacionService} from '../services';

export class PagoController {
  constructor(
    @repository(PagosRepository)
    public pagosRepository: PagosRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(SolicitudCliRepository)
    public SolicitudCliRepository: SolicitudCliRepository,
    @repository(InmuebleRepository)
    public InmuebleRepository: InmuebleRepository,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
  ) { }

  @post('/pagos')
  @response(200, {
    description: 'Pagos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pagos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {
            title: 'NewPagos',
            exclude: ['id'],
          }),
        },
      },
    })
    pagos: Omit<Pagos, 'id'>,
  ): Promise<Pagos> {
    let SolicitudCliente = await this.SolicitudCliRepository.findOne({where: {IdSolicitud: pagos.solicitudCliId}})
    if (!SolicitudCliente) {
      throw new HttpErrors[403]("No se encuentra la solicitud para notificar.")
    }
    let inmueble = await this.InmuebleRepository.findOne({where: {CodigoIn: SolicitudCliente.inmuebleId}})
    if (!inmueble) {
      throw new HttpErrors[403]("No se encuentra el inmueble para notificar.")
    }
    let cliente = await this.clienteRepository.findOne({where: {IdCliente: SolicitudCliente.clienteId}})
    if (!cliente) {
      throw new HttpErrors[403]("No se encuentra el cliente para notificar.")
    }
    let asunto = 'Solicitud Aceptada'
    let contenido = `<strong>Hola, buen dia</strong><br />su PAGO del inmuble ${inmueble.NombreIn} ha sido REALIZADO por un total de ${inmueble.ValorIn} en el sistemas de UdeC S.A.S. :P :) `
    this.servicioNotificacion.EnviarEmail(cliente.EmailCli, asunto, contenido);
    return this.pagosRepository.create(pagos);
  }

  @get('/pagos/count')
  @response(200, {
    description: 'Pagos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pagos) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.pagosRepository.count(where);
  }

  @get('/pagos')
  @response(200, {
    description: 'Array of Pagos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pagos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pagos) filter?: Filter<Pagos>,
  ): Promise<Pagos[]> {
    return this.pagosRepository.find(filter);
  }

  @patch('/pagos')
  @response(200, {
    description: 'Pagos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Pagos,
    @param.where(Pagos) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.pagosRepository.updateAll(pagos, where);
  }

  @get('/pagos/{id}')
  @response(200, {
    description: 'Pagos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pagos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pagos, {exclude: 'where'}) filter?: FilterExcludingWhere<Pagos>
  ): Promise<Pagos> {
    return this.pagosRepository.findById(id, filter);
  }

  @patch('/pagos/{id}')
  @response(204, {
    description: 'Pagos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Pagos,
  ): Promise<void> {
    await this.pagosRepository.updateById(id, pagos);
  }

  @put('/pagos/{id}')
  @response(204, {
    description: 'Pagos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pagos: Pagos,
  ): Promise<void> {
    await this.pagosRepository.replaceById(id, pagos);
  }

  @del('/pagos/{id}')
  @response(204, {
    description: 'Pagos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagosRepository.deleteById(id);
  }
}
