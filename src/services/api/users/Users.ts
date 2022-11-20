import { Api } from "../axios-config";
interface IUser {
  id: number;
  username: string;
  accountId: number;
}

interface IUserData {
  username: string;
  password: string;
}

interface IToken {
  token: string;
}

const create = async (
  userData: IUserData,
  success: any,
  error: any
): Promise<any> => {
  return await Api.post<IUser>("/user/signup", userData)
    .then(() => success())
    .catch((err) => error(err.response.data));
};

const login = async (
  data: IUserData,
  setToken: any,
  setUserLogin: any,
  success: any,
  error: any
): Promise<any> => {
  const response = await Api.post<IToken>("/user/signin", data)
    .then((res) => {
      setUserLogin(data.username);
      setToken(res.data.token);
      localStorage.setItem(
        "@user:digital_wallet",
        JSON.stringify(data.username)
      );
      localStorage.setItem("@token:digital_wallet", res.data.token);
      success();
    })
    .catch((err) => error(err.response.data));

  return response;
};

export const UsersService = {
  create,
  login,
};
