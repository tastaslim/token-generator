import axios from 'axios';
import { stringify } from "qs";
import { log } from 'console';
/**
 * This class contains methods which helps us to get access token for microsoft cloud using some credentials such tenantId, client_id etc.
 * @class MicrosoftAuthenticator
 */
export class MicrosoftAuthenticator {
  /**
	* authenticate() function returns access token based on the credentials provided for microsoft cloud provider. It checks if the token
	* is expired or not, if not it uses the same token instead of making a call to Microsoft cloud/server otherwise it calls microsoft cloud
	* and generates new token.
	* With the help of this token, we can access information of any user in the tenant based on the scopes/permissions.
	* If credentials provided by user are not correct, it returns 401 error saying that access denied for the target resource.
	* @param {string} tenantId Id of the tenant.
	* @example
		Sample Code:
		const microsoftObject=new MicrosoftAuthenticator();
		microsoftObject.authenticate('Database key','Id of the tenant').then( res => console.log(res)).catch(err => console.log(err));
	* @returns {string} The access token for the tenant.
	*/
  public static async getAccessToken(tenantId: string): Promise<string | undefined> {
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
