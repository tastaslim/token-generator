import { SCOPE } from '../config.js';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { stringify } from "qs";
import * as fse from "fs-extra";

export class GoogleAuthenticator {
  static async getAccessToken(userId) {
    let privateKey, tokenUrl, secretManagerData;
    if (process.env.ENVIRONMENT == 'LOCAL' || "DEV") {
      /*
      secretManagerData = readJSONSync("/tmp/privateKey.json");
      privateKey = secretManagerData.private_key;
      tokenUrl = secretManagerData.token_uri;
      */
    } else {
      secretManagerData = fse.readJSONSync("/tmp/privateKey.json");
      privateKey = secretManagerData.private_key;
      tokenUrl = secretManagerData.token_uri;
    }

    const claims = {
      iss: secretManagerData.client_email,
      sub: userId,
      aud: tokenUrl,
      scope: SCOPE,
      exp: Math.floor(new Date().getTime() / 1000) + 3600,
      iat: Math.floor(new Date().getTime() / 1000)
    };
    const authCode = jwt.sign(claims, privateKey, { algorithm: "RS256" });
    const response = await axios.post(tokenUrl, stringify({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: authCode }));
    return response.data.access_token;
  }
}
