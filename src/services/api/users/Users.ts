import React, { FunctionComponent } from "react";
import { Api } from "../axios-config";
import {
  TypeOptions,
  ToastContent,
  Toast,
} from "react-toastify/dist/types/index";
import { toast } from "react-toastify";

interface IUser {
  id: number;
  username: string;
  accountId: number;
}

interface IUserData {
  username: string;
  password: string;
}

const create = async (
  userData: IUserData,
  success: any,
  error: any
): Promise<any> => {
  console.log(error);

  return await Api.post<IUser>("/user/signup", userData)
    .then(() => success())
    .catch((err) => error(err.response.data));
};

export const UsersService = {
  create,
};
