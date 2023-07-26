import { readJSONSync } from 'fs-extra';
import axios from 'axios';
import base64url from 'base64url';
import { createSign } from 'crypto';
import { stringify } from "qs";
export class SalesforceAuthenticator {
  public static async getAccessToken(userId: string): Promise<string> {
    const secretManagerData = readJSONSync('/tmp/privateKeySalesforce.json');
    const header = { alg: 'RS256' };
    const claimsSet = {
      iss: secretManagerData.client_id,
      sub: userId,
      aud: secretManagerData.url,
      exp: Math.floor(Date.now() / 1000) + 60 * 5
    };
    const sign = createSign('RSA-SHA256').update(`${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claimsSet))}`);
    sign.end();

    const signature = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claimsSet))}.${base64url(sign.sign(secretManagerData.privatekey))}`;
    const response = await axios.post(`${secretManagerData.url}/services/oauth2/token`, stringify({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: signature }));
    return (await response.data).access_token;
  }
}
