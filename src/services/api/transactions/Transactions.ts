import { Api } from "../axios-config";

const transfer = async (
  data: any,
  token: any,
  success: any,
  error: any
): Promise<any> => {
  const response = await Api.post<any>("/transaction/new", data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      success();
    })
    .catch((err) => error(err.response.data));

  return response;
};

const searchTransactions = async (
  token: any,
  setUserDataLogged: any
): Promise<any> => {
  const response = await Api.get<any>("/transaction/list", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res.data.transactions);

      setUserDataLogged(res.data.transactions);
    })
    .catch((_) => {});

  return response;
};

export const TransactionsService = {
  transfer,
  searchTransactions,
};
