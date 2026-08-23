'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserAdapter } from '../adapters/user.adapter';

interface AuthContextType {
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  isLoading: boolean;
  loginError: string | null;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Restaurar sesión activa desde localStorage en el primer render del cliente
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('app_user_session');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('app_user_session');
        }
      }
    }
  }, []);

  const openLoginModal = () => {
    setLoginError(null);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginError(null);
    setIsLoginModalOpen(false);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // Capa Service (Obtiene DTO)
      const userDto = await AuthService.login(email, pass);

      if (!userDto) {
        setLoginError('Credenciales inválidas o usuario inactivo.');
        setIsLoading(false);
        return false;
      }

      // Capa Adapter (Transforma DTO -> Model)
      const userModel = UserAdapter.toModel(userDto);

      // Actualiza Estado UI y LocalStorage
      setUser(userModel);
      if (typeof window !== 'undefined') {
        localStorage.setItem('app_user_session', JSON.stringify(userModel));
      }

      setIsLoginModalOpen(false);
      setIsLoading(false);
      return true;
    } catch {
      setLoginError('Ocurrió un error al procesar el inicio de sesión.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('app_user_session');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        isLoading,
        loginError,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
