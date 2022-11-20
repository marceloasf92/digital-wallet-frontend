import { createContext, useContext, useState } from "react";

const LoginContext = createContext({} as any);

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }: any) => {
  const [userLogin, setUserLogin] = useState(() => {
    const newUser = localStorage.getItem("@user:digital_wallet");
    if (newUser) {
      return JSON.parse(newUser);
    }
    return {};
  });
  const [token, setToken] = useState(
    localStorage.getItem("@token:digital_wallet") || ""
  );

  const [balance, setBalance] = useState(-1);

  const [updatedat, setUpdatedat] = useState("");

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
        userLogin,
        setUserLogin,
        balance,
        setBalance,
        updatedat,
        setUpdatedat,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
