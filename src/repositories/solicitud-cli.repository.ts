import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudCli, SolicitudCliRelations, Cliente, Inmueble, Usuario} from '../models';
import {ClienteRepository} from './cliente.repository';
import {InmuebleRepository} from './inmueble.repository';
import {UsuarioRepository} from './usuario.repository';

export class SolicitudCliRepository extends DefaultCrudRepository<
  SolicitudCli,
  typeof SolicitudCli.prototype.IdSolicitud,
  SolicitudCliRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudCli.prototype.IdSolicitud>;

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof SolicitudCli.prototype.IdSolicitud>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof SolicitudCli.prototype.IdSolicitud>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(SolicitudCli, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
