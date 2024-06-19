// authContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userCredentials) => {
    const { email, token } = userCredentials;
    setAuthUser({ email, token });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    authUser,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}
