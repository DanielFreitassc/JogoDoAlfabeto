import { createContext, useEffect, useState } from "react";
import { IUser, IAuthProvider, IContext } from "./types";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext | null>(null);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(login: string, password: string) {
    try {
      const response = await LoginRequest(login, password);
      if (response && response.token) {
        const payload = { token: response.token, login };
        setUser(payload);
        setUserLocalStorage(payload);
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      throw new Error("Erro ao autenticar");
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};