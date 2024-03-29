import { BaseAuthenticator } from './interface/BaseAuthenticator';
import ActiveDirectory from 'activedirectory';
import { env } from 'process';
import 'dotenv/config';
import { BaseMessageDTO } from './BaseMessageDTO';
import { Injectable, HttpStatus } from '@nestjs/common';
import { ADInterface } from './interface/ADInterface';

@Injectable()
export class LDAPAuth implements BaseAuthenticator {
  private adOptions: ADInterface = {
    baseDN: env.AD_BASEDN,
    domain: env.AD_DOMAIN,
    url: env.AD_URL,
  }
  private ad = new ActiveDirectory(this.adOptions);

  authenticate(
    username: string,
    password: string,
  ): Promise<boolean | BaseMessageDTO> {
    return new Promise((resolve, reject) => {
      this.ad.authenticate(username, password, (err, auth) => {
        console.log({ auth });
        if (auth) {
          console.log('Authenticated AD!', JSON.stringify(auth));
          return resolve(auth);
        }
        if (err) {
          console.log('ERROR AUTH: ' + JSON.stringify(err));
          const notFound: BaseMessageDTO = {
            name: 'SERVER_NOT_FOUND',
            description: `There was an internal server error: ${err.lde_message}`,
            httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };
          if (err.errno == 'ENOTFOUND') {
            notFound.name = 'SERVER_NOT_FOUND';
            notFound.description = 'Server not found';
          }
          // console.log(err)
          // console.log(typeof err)

          return reject(notFound);
        } else {
          console.log('Authentication failed!');
          const err: BaseMessageDTO = {
            name: 'INVALID_CREDENTIALS',
            description: 'The supplied credentials are invalid',
            httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };

          console.log('ERROR: ' + JSON.stringify(err));
          return reject(err);
        }
      });
    });
  }
}
