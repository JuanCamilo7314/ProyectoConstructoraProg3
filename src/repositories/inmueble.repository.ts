import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Bloque} from '../models';
import {BloqueRepository} from './bloque.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.CodigoIn,
  InmuebleRelations
> {

  public readonly bloque: BelongsToAccessor<Bloque, typeof Inmueble.prototype.CodigoIn>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Inmueble, dataSource);
    this.bloque = this.createBelongsToAccessorFor('bloque', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloque', this.bloque.inclusionResolver);
  }
}
