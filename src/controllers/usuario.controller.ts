import {authenticate} from '@loopback/authentication';
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
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {CambiarClave, Credenciales, ResetearClave, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {ControlClaveService, JwtService, NotificacionService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(ControlClaveService)
    public claveService: ControlClaveService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
    @service(JwtService)
    public serviciotoken: JwtService
  ) { }

  @authenticate('admin')
  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['IdUsuario'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'IdUsuario'>,
  ): Promise<Usuario> {
    let claveAleatoria = this.claveService.GenerarClaveAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.claveService.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);
    usuario.Clave = claveCifrada;
    let usuarioAgregado = await this.usuarioRepository.create(usuario);

    //Notificar al usuario
    let contenido = `<strong>Hola, buen dia</strong><br />su correo ha sido registrado en el sistemas de UdeC S.A.S. Sus datos de acceso son: <br /><br /> <ul><li>Usuario : ${usuario.EmailU}</li><li>Contraseña : ${claveAleatoria}</li></ul> <br /> <br /> :)`
    this.servicioNotificacion.EnviarEmail(usuario.EmailU, llaves.AsuntoRegistro, contenido);
    return usuarioAgregado;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @authenticate('admin')
  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @authenticate('admin')
  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @authenticate('admin')
  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @authenticate('admin')
  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @put('/cambio-clave')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(CambiarClave)}},
  })
  async changePassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambiarClave),
        },
      },
    })
    cambiarClave: CambiarClave,
  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {EmailU: cambiarClave.EmailU}})
    if (!usuario) {
      throw new HttpErrors[403]("No se encuentra al usuario.")
    }
    if (this.claveService.DescifrarTexto(usuario.Clave) != cambiarClave.ClaveActual) {
      console.log(cambiarClave.ClaveActual);
      console.log(this.claveService.DescifrarTexto(usuario.Clave));
      throw new HttpErrors[403]("Las contraseñas no coinciden")
    }
    console.log(cambiarClave.ClaveActual);
    console.log(this.claveService.DescifrarTexto(usuario.Clave));
    let claveCifrada = this.claveService.CifrarTexto(cambiarClave.ClaveNueva);
    console.log(claveCifrada);
    usuario.Clave = claveCifrada;
    await this.usuarioRepository.update(usuario);
    //Notificar al usuario
    let contenido = `Hola, hemos cambiado su clave de su cuenta de UdeC S.A.S. Usuario : ${usuario.EmailU} y Clave : ${cambiarClave.ClaveNueva}.`
    let enviado = this.servicioNotificacion.EnviarSMS(usuario.TelefonoU, contenido);
    if (enviado) {
      return {
        enviado: "OK"
      };
    }
    return {
      enviado: "KO"
    };
  }

  @post('/reset-password')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {EmailU: resetearClave.EmailU}})
    if (!usuario) {
      throw new HttpErrors[403]("No se encuentra al usuario.")
    }
    let claveAleatoria = this.claveService.GenerarClaveAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.claveService.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);
    usuario.Clave = claveCifrada;
    await this.usuarioRepository.update(usuario);

    //Notificar al usuario
    let contenido = `Hola, hemos reseteado su clave su cuenta de UdeC S.A.S. Usuario : ${usuario.EmailU} y Clave : ${claveAleatoria}.`
    let enviado = this.servicioNotificacion.EnviarSMS(usuario.TelefonoU, contenido);
    if (enviado) {
      return {
        enviado: "OK"
      };
    }
    return {
      enviado: "KO"
    };
  }
  @post('/login', {
    responses: {
      '200': {
        description: 'Identificacion de usuarios'
      }
    }
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales),
        },
      },
    }) credenciales: Credenciales

  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {EmailU: credenciales.EmailU}});
    if (usuario) {
      if (this.claveService.DescifrarTexto(usuario.Clave) == credenciales.ClaveU) {
        console.log(usuario.EmailU)
        console.log(usuario.Clave)
        //generar token
        let tk = this.serviciotoken.CrearTokenJWT(usuario);
        usuario.Clave = '';
        return {
          user: usuario,
          token: tk
        }
      } else {
        throw new HttpErrors[401]("Clave incorrecta.")
      }
    } else {
      throw new HttpErrors[401]("Usuario incorrecto.")
    }
  }
}
