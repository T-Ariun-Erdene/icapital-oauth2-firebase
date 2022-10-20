import * as functions from "firebase-functions";
import {
  authorize,
  Configuration,
  googleAccountAuthentication,
  token,
} from "oauth2-firebase";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Google sign-in configuration
 */
Configuration.init({
  crypto_auth_token_secret_key_32:
  functions.config().crypto.auth_token_secret_key_32,
  project_api_key:
  functions.config().project.api_key,
});

/**
 * Token endpoint
 */
exports.token = token();
/**
 * Authorization endpoint
 */
exports.authorize = authorize();
/**
 * Login page for Google sing-in
 */
exports.authentication = googleAccountAuthentication();
