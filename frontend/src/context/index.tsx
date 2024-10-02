import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { privateAPi } from "../services/privateApi";
  import { setUserLocalStorage } from "../context/AuthProvider/util";
  
  interface AutorizacaoContextType {
    isAuthenticated: boolean;
    userRole: string;
  }
  
  const AutorizacaoContext = createContext<AutorizacaoContextType | undefined>(
    undefined
  );
  
  interface AutorizacaoProviderProps {
    children: ReactNode;
  }
  
  export const AutorizacaoProvider: React.FC<AutorizacaoProviderProps> = ({
    children,
  }: AutorizacaoProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [userRole, setUserRole] = useState<string>("");
  
    useEffect(() => {
      const validaToken = async () => {
        try {
          const response = await privateAPi.get("/validation");
          const { role } = response.data;
          setUserRole(role);
        } catch (error: any) {
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            setUserLocalStorage(null);
            setIsAuthenticated(false);
          } else {
            console.error("Erro:", error);
          }
        }
      };
      validaToken();
    }, []);
  
    return (
      <AutorizacaoContext.Provider value={{ isAuthenticated, userRole }}>
        {children}
      </AutorizacaoContext.Provider>
    );
  };
  
  export const useAutorizacao = () => {
    const context = useContext(AutorizacaoContext);
    if (!context) {
      throw new Error("useAutorizacao must be used within a AutorizacaoProvider");
    }
    return context;
  };