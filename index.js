// import { GoogleAuthenticator } from './clouds/GoogleAuthenticator.js';
import { MicrosoftAuthenticator } from './clouds/MicrosoftAuthenticator.js';
// import { SalesforceAuthenticator } from './clouds/SalesforceAuthenticator.js';
// export {
//   GoogleAuthenticator,
//   MicrosoftAuthenticator,
//   SalesforceAuthenticator
// }


(async() => {
  const token = await MicrosoftAuthenticator.getAccessToken(
    "649b37da-e479-45dc-a099-fda797d7fcee"
  );
  console.log(token);
})();