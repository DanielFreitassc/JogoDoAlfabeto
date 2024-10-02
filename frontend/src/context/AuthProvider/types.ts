export interface IUser {
    login?: string;
    token?: string;
  }
  
  export interface IContext extends IUser {
    authenticate: (login: string, password: string) => Promise<void>;
    logout: () => void;
    user: IUser | null;
  }
  
  export interface IAuthProvider {
    children: JSX.Element;
  }