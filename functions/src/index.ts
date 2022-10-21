import * as functions from "firebase-functions";
import {
  authorize,
  Configuration,
  googleAccountAuthentication,
  token,
  userinfo,
  tokeninfo,
} from "oauth2-firebase";
import {
  ConsentViewTemplate,
} from "oauth2-firebase/dist/endpoint/views/consent_view_template";

/**
 * Token expire time configuration
 */
const expiresInMap = new Map<string, number>();
expiresInMap.set("authorization_code", 2678400);
expiresInMap.set("implicit", 86400);
expiresInMap.set("password", 86400);
expiresInMap.set("client_credentials", 2678400);
expiresInMap.set("refresh_token", 2678400);

/**
 * Consent view
 */
export class MyConsentViewTemplate implements ConsentViewTemplate {
  /**
   * Consent
   * @return {object}
   */
  provide(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve(`<!DOCTYPE html>

<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Authorization page</title>
</head>
<body>
<p><%= providerName %> requests the following permissions:</p>
<ul>
    <% for (const key of scope.split(" ")) { %>
    <li><%= scopes.get(key) %></li>
    <% } %>
</ul>
<p>Could you allow them?</p>
<form method="post" action="/authorize/consent">
    <input type="hidden" name="auth_token" value="<%= encryptedAuthToken %>">
    <input type="hidden" name="user_id" value="<%= encryptedUserId %>">
    <button type="submit" name="action" value="allow">Allow</button>
    <button type="submit" name="action" value="deny">Deny</button>
</form>
</body>
</html>
`);
    });
  }
}

Configuration.init({
  crypto_auth_token_secret_key_32: functions.config().
      crypto.
      auth_token_secret_key_32,
  project_api_key: functions.config().project.api_key,
  tokens_expires_in: expiresInMap,
  views_consent_template: new MyConsentViewTemplate(),
});

exports.token = token();
exports.authorize = authorize();
exports.authentication = googleAccountAuthentication();
exports.userinfo = userinfo();
exports.tokeninfo = tokeninfo();
