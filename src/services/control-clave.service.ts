import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {generate} from 'generate-password';
import {Keys as llaves} from '../config/keys';
const CryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class ControlClaveService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  GenerarClaveAleatoria(): string {
    let pass = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true
    });
    return pass;
  }

  /**
   * Cifrar una cadena
   */

  CifrarTexto(texto: string): string {
    let ciphertext = CryptoJS.AES.encrypt(texto, llaves.AESkey).toString();
    return ciphertext;
  }

  DescifrarTexto(texto: undefined | string): string {
    var bytes = CryptoJS.AES.decrypt(texto, llaves.AESkey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
}
