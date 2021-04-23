import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services/';
export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(@service(JwtService)
  public servicioJWT: JwtService) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request)
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud.")
    }
    let info = this.servicioJWT.VerificarTokenJWT(token);
    if (info) {
      if (info.data.role == '6083256f855f1d6c1048f7be') {
        let perfil: UserProfile = Object.assign({
          id: info.data.id,
          nombre_usuario: info.data.nom_usuario,
          role: info.data.role
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token es valido pero no tiene los permisos suficientes para ejecutar esta accion.")
      }
    } else {
      throw new HttpErrors[401]("El token enviado no es valido.")
    }

  }
}
