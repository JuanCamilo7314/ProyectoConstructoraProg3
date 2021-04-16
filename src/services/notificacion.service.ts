import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';

const sgMail = require('@sendgrid/mail');
var twilio = require('twilio');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  EnviarEmail(destino: String, asunto: String, contenido: String) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino,
      from: llaves.EmailFrom,
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.log(error)
      });

  }

  /*
   * Enviar sms
   */

  EnviarSMS(telefonoDestino: string, mensaje: string) {
    try {
      var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
      var authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console

      var client = new twilio(accountSid, authToken);

      client.messages.create({
        body: mensaje,
        to: telefonoDestino,  // Text this number
        from: llaves.twilioPhone // From a valid Twilio number
      })
        .then((message: any) => {
          console.log(message.sid);
          return true;
        });
      return true;
    } catch {
      return false;
    }
  }
}
