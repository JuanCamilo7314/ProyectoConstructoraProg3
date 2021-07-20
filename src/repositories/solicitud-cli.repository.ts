import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudCli, SolicitudCliRelations, Cliente, Inmueble, Usuario, Pagos} from '../models';
import {ClienteRepository} from './cliente.repository';
import {InmuebleRepository} from './inmueble.repository';
import {UsuarioRepository} from './usuario.repository';
import {PagosRepository} from './pagos.repository';

export class SolicitudCliRepository extends DefaultCrudRepository<
  SolicitudCli,
  typeof SolicitudCli.prototype.IdSolicitud,
  SolicitudCliRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudCli.prototype.IdSolicitud>;

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof SolicitudCli.prototype.IdSolicitud>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof SolicitudCli.prototype.IdSolicitud>;

  public readonly pagos: HasOneRepositoryFactory<Pagos, typeof SolicitudCli.prototype.IdSolicitud>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PagosRepository') protected pagosRepositoryGetter: Getter<PagosRepository>,
  ) {
    super(SolicitudCli, dataSource);
    this.pagos = this.createHasOneRepositoryFactoryFor('pagos', pagosRepositoryGetter);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
