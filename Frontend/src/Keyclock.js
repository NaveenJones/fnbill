import Keycloak from "keycloak-js";

export const keycloak_config = {
  url: "https://auth.fnmoney.ai",
  realm: "fnauth",
  clientId: "FnMoney",
  
};
export const init_options = { onLoad: "login-required" };

const keycloak = new Keycloak(keycloak_config);
 
export default keycloak;
//
