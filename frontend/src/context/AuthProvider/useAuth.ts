import { useContext } from "react";
import { AuthContext } from ".";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("error");
  }

  return context;
};