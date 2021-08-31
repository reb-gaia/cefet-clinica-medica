// auth -> chave de autenticação
// signIn -> login do usuario -> auth
// signOut -> Deslogar o usuario -> excluir o auth
// api
// error -> erros

import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from "../../../services/api";

const AuthContext = createContext({});

function AuthProvider({children}) {
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem('@Login');
    if(token) {
      return token;
    }
    return "";
  });

  // useCallback -> melhora a performance das funções
  const SignIn = useCallback(
    async ({email, password}) => {
      setError("");
      try {
        if(!email || !password) {
          setError("Email e senha inválidos");
          return
        }

        const { data } = await api.get(`/employees?email=${email}`);

        if(data.length === 0) {
          setError("Email e senha inválidos");
          return
        }

        if(data[0].password !== password) {
          setError("Email e senha inválidos");
          return
        }
       
        if(data[0].doctorType !== '') {
          sessionStorage.setItem('@Doctor', data[0].id);
        } 

        sessionStorage.setItem('@Login', data[0].access_token);
        setAuth(data[0].access_token);
        api.defaults.headers.Authorization = `Bearer ${data[0].access_token}`

      } catch (error) {
        setError("Email e senha inválidos");
      }
  }, []);

  const SignOut = useCallback(() => {
    sessionStorage.removeItem('@Login');
    setAuth("");
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        auth, 
        error,
        SignIn,
        SignOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };