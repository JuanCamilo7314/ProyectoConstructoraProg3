import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Pais, Proyecto} from '../models';
import {PaisRepository} from './pais.repository';
import {ProyectoRepository} from './proyecto.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.CodigoC,
  CiudadRelations
> {

  public readonly pais: BelongsToAccessor<Pais, typeof Ciudad.prototype.CodigoC>;

  public readonly proyectos: HasManyRepositoryFactory<Proyecto, typeof Ciudad.prototype.CodigoC>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
  }
}
