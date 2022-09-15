import React, { useState, createContext } from 'react';

interface IUser {
  email: string;
  id: string;
  name: string;
  roles: string[];
  isValidated: boolean;
}

const initialUser:IUser = {
  email: '',
  id: '',
  name: '',
  roles: [],
  isValidated: false
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

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
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
      roles: user.roles,
      isValidated: user.isValidated
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
