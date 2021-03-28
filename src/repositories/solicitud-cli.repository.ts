import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudCli, SolicitudCliRelations} from '../models';

export class SolicitudCliRepository extends DefaultCrudRepository<
  SolicitudCli,
  typeof SolicitudCli.prototype.IdSolicitud,
  SolicitudCliRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(SolicitudCli, dataSource);
  }
}
