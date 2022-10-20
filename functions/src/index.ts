import * as functions from "firebase-functions";
import {
  authorize,
  Configuration,
  googleAccountAuthentication,
  token,
} from "oauth2-firebase";

Configuration.init({
  crypto_auth_token_secret_key_32: functions.config().
      crypto.
      auth_token_secret_key_32,
  project_api_key: functions.config().project.api_key,
});

exports.token = token();
exports.authorize = authorize();
exports.authentication = googleAccountAuthentication();
