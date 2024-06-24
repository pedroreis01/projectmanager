import React, { useCallback, createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAlert from './useAlert';

export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  accessToken: string;
}

interface AuthContextData {
  user: User;
  signIn(cpf: string, senha: string): Promise<void>;
  signOut(): void;
}

interface AuthProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const { addAlert } = useAlert();
  const location = useLocation();
  const [user, setUser] = useState<User>(() => {
    const jsonString =
      localStorage.getItem('@Dysrup:user') ??
      `{
      "id": "", 
      "name": "", 
      "email": "", 
      "login": "",
      "accessToken": ""
    }`;

    const userObject: User = JSON.parse(jsonString);

    return userObject;
  });
  const navigate = useNavigate();

  const signOut = useCallback(async () => {
    localStorage.clear();
    setUser({
      id: '',
      name: '',
      email: '',
      login: '',
      accessToken: ''
    });
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const signIn = useCallback(
    async (login: string, password: string) => {
        api
        .post('auth/signIn', {
          login: login,
          password: password,
        })
        .then((response) => {
            const user: User = response.data;
            setUser(() => {
                const obj = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    login: user.login,
                    accessToken: user.accessToken
                };
                localStorage.setItem('@Dysrup:user', JSON.stringify(obj));
                return obj;
              });
        })
        .then(() => {
          addAlert({
            type: 'success',
            title: 'Login realizado com sucesso',
            message: 'Bem vindo ao Dysrup Projects',
          });

          navigate('/meus-projetos');
        })
        .catch((error) => {
          addAlert({
            type: 'danger',
            title: 'Error ao realizar o login',
            message: error.response.data.message,
          });
        });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
