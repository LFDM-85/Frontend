import { useState, createContext } from 'react';

interface IUser {
  email: string;
  id: string;
  name: string;
  role: [];
}

const initialUser = {
  email: '',
  id: '',
  name: '',
  role: [],
};

const AuthContext = createContext({
  token: undefined,
  isSignedIn: false,
  user: initialUser,
  signin: (token: string, user: IUser) => {
    /**/
  },
  signout: () => {
    /**/
  },
});

export const AuthContextProvider = ({children}: any) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState(initialUser);
  const userIsSignedIn = !!token;

  const signinHandler = (token: string, user: IUser) => {
    localStorage.setItem('isAuthenticated', 'true');
    // setToken(token);
    setUser({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    });
  };

  const signoutHandler = () => {
    setToken(undefined);
    setUser(initialUser);
  };

  const contextValue = {
    token: token,
    user: user,
    isSignedIn: userIsSignedIn,
    signin: signinHandler,
    signout: signoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
