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

export const TransactionsService = {
  transfer,
};
