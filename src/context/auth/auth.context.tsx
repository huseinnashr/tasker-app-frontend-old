import React, { createContext, FC, useState } from "react";
import { SignInResponseDTO } from "../../type";

interface AuthContextProps {
  auth: SignInResponseDTO | null;
  setAuth: (auth: SignInResponseDTO) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: () => {},
});

export const AuthContextProvider: FC = ({ children }) => {
  const storedAuth = localStorage.getItem("auth");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;

  const [auth, _setAuth] = useState<SignInResponseDTO | null>(initialAuth);

  const setAuth = (auth: SignInResponseDTO | null) => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
    _setAuth(auth);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
