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

interface IBalance {
  balance: string;
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

const showBalance = async (
  token: string,
  setBalance: any,
  setUpdatedat: any
) => {
  const response = await Api.get<IBalance>("/account/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      let data = new Date();
      let hora = data.getHours();
      let min = data.getMinutes();
      let seg = data.getSeconds();
      let str_hora = hora + ":" + min + ":" + seg;
      localStorage.setItem(
        "@updateat:digital_wallet",
        JSON.stringify(str_hora)
      );
      setBalance(res.data.balance);
      setUpdatedat(localStorage.getItem("@updateat:digital_wallet"));
    })
    .catch();

  return response;
};

const handleLogout = (setToken: any) => {
  localStorage.clear();
  setToken("");
};

export const UsersService = {
  create,
  login,
  showBalance,
  handleLogout,
};
