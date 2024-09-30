import { create } from "zustand";
import keycloak from "../Keyclock";
import { getUsersAPI } from "./api";

const InitialUser = {
  user: null,
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
  message: "Unauthorized Access",
  attempted: 0,
};

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : InitialUser;

const InitialState = {
  global: {
    title: "Welcome to FN Money",
  },
  user: user,
};

export const useGlobalState = create((set) => ({
  global: InitialState.global,
  user_list: [],
  user_info: InitialState.user,
  keycloak: {
    keycloakInstance: keycloak,
    isAuth: false,
    isInit: false,
  },
  
  changeTitle: (title) => {
    set((state) => ({ global: { title: title } }));
  },
  setKeycloakInstance: (instance) => {
    set((state) => ({ ...state, keycloakInstance: instance }));
  },
  setIsKeycloakInit: (init_state) => {
    set((state) => ({
      ...state,
      keycloak: { ...state.keycloak, isInit: init_state },
    }));
  },
  setIsKeycloakAuth: (auth_state) => {
    set((state) => ({
      ...state,
      keycloak: { ...state.keycloak, isAuth: auth_state },
    }));
  },

  initLogin: async (payload) => {
    let user_info = InitialState.user;
    if (payload)
      user_info = {
        user: payload.user,
        access_token: payload.access_token,
        refresh_token: payload.refresh_token,
        isLoggedIn: true,
      };

    set((state) => ({
      ...state,
      user_info: { ...user_info, attempted: state.user_info.attempted + 1 },
    }));
    localStorage.setItem("user", JSON.stringify(user_info));
  },
  initLogout: () => {
    localStorage.clear();
    set((state) => ({ ...state, user_info: InitialUser }));
  },

  setUserList :async () => {
    const response = await getUsersAPI();
    if (response.code === 1200) {
    const user_list = response.content;
    set((state) => ({
      ...state,
      user_list: user_list,
    })); 
    }
    
  },
}));
