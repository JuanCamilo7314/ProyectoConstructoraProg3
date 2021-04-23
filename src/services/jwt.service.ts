import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  CrearTokenJWT(usuario: Usuario) {
    let clavesecreta = llaves.jwtKey;
    let tk = jwt.sign({
      exp: llaves.expTimeJWT,
      data: {
        id: usuario.IdUsuario,
        nom_usuario: usuario.NombreU,
        role: usuario.rolId
      }
    }, clavesecreta);
    return tk;
  }

  VerificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, llaves.jwtKey);
      return decoded;
    } catch {
      return null;
    }
  }
}
