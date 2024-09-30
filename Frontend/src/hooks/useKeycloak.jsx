import { useCallback, useEffect, useState } from "react";
import { init_options } from "../Keyclock";
import { useGlobalState } from "../app/global_store";

const useKeycloak = () => {
  const {
    initLogin,
    initLogout,
    user,
    keycloak: { keycloakInstance, isAuth, isInit },
    setIsKeycloakAuth,
    setIsKeycloakInit,
  } = useGlobalState((state) => state);

  const login = useCallback(() => keycloakInstance.login(), [keycloakInstance]);
  const register = useCallback(() => keycloakInstance.register(), [keycloakInstance]);

  const logout = useCallback(() => {
    keycloakInstance.logout();
    initLogout();
  }, [keycloakInstance]);

  const getToken = useCallback(() => keycloakInstance.token, [keycloakInstance]);

  const getUserInfo = useCallback(async () => {
    if (isAuth) return keycloakInstance.loadUserInfo();
    return null;
  }, [keycloakInstance, isAuth]);

  const initKeyClock = useCallback(async () => {
    if (!isInit)
      keycloakInstance
        .init(init_options)
        .then(async (isAuth) => {
          setIsKeycloakInit(true);
          const user_info = {
            user: await keycloakInstance.loadUserInfo(),
            access_token: keycloakInstance.token,
            refresh_token: keycloakInstance.refreshToken,
          };
          initLogin(user_info);
          setIsKeycloakAuth(isAuth);
        })
        .catch((err) => {
          console.error("Failed to initialize Keycloak:", err);
        });
  }, [keycloakInstance, isAuth]);

  return {
    keycloak: keycloakInstance,
    initKeyClock,
    isAuth,
    isInit,
    register,
    login,
    logout,
    getToken,
    getUserInfo,
  };
};

export default useKeycloak;
