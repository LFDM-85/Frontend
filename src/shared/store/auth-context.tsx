import React, { useState, createContext, useCallback } from 'react';
import { IUser } from '../interfaces/interfaces';

const initialUser: IUser = {
  email: '',
  _id: '',
  name: '',
  roles: [],
  isValidated: false,
  image: '',
  classes: [],
  assessment: [],
};

const AuthContext = createContext({
  token: '',
  isSignedIn: false,
  user: initialUser,
  signin: (token: string, user: IUser) => {
    /**/
  },
  signout: () => {
    /**/
  },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(initialUser);
  const userIsSignedIn = !!token;

  const signinHandler = useCallback((token: string, user: IUser) => {
    // localStorage.setItem('isAuthenticated', 'true');
    setToken(token);
    setUser({
      email: user.email,
      _id: user._id,
      name: user.name,
      roles: user.roles,
      isValidated: user.isValidated,
      image: user.image,
      classes: user.classes,
      assessment: user.assessment,
    });
  }, []);

  const signoutHandler = () => {
    setToken('');
    setUser(initialUser);
  };

  const contextValue = {
    token: token,
    user: user,
    isSignedIn: !!token,
    signin: signinHandler,
    signout: signoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
