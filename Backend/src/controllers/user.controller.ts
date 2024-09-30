import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { createUserAPI, getAllUsersAPI, getTokenAPI } from "../api/external.api";
import { res_func } from "../common/response.handling";

export const createUser = async (req: Request, res: Response) => {
  const { email, firstName, lastName, username, password } = req.body;
  const {
    data: { access_token },
  } = await getTokenAPI();
  const userData = {
    email,
    firstName,
    lastName,
    username,
    emailVerified: true,
    enabled: true,
    credentials: [
      {
        type: "password",
        value: password,
        temporary: false,
      },
    ],
  };
  const response = await createUserAPI(access_token, userData);
  if (response.status === 201) return res.json(res_func({ code: 1201, content: username }));
};

export const getUsers = async (req: Request, res: Response) => {
  const {
    data: { access_token },
  } = await getTokenAPI();
  const user_list_response = await getAllUsersAPI(access_token);
  if (user_list_response.status === 200) return res.json(res_func({ code: 1200, content: user_list_response.data }));
};
