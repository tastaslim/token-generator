import axios from 'axios';
import { stringify } from "qs";
import { log } from 'console';
export class MicrosoftAuthenticator {
  static async getAccessToken(tenantId) {
    try {
      const graphCredentials = {
        token_uri: `https://login.microsoftonline.com/${tenantId}/oauth2/token`,
        client_id: process.env.MICROSOFT_CLIENT_ID,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET,
        grant_type: 'client_credentials',
        resource: 'https://graph.microsoft.com'
      };
      const response = await axios.post(graphCredentials.token_uri, stringify(graphCredentials));
      return response.data.access_token;
    } catch (err) {
      log(err);
    }
  }
}
