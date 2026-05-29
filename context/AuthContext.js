// context/AuthContext.js
// Contexto global de autenticação — envolve toda a aplicação no App.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogout, getUsuarioLocal } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Recarrega sessão ao abrir o app
  useEffect(() => {
    const restaurarSessao = async () => {
      try {
        const tokenSalvo = await AsyncStorage.getItem('token');
        const usuarioSalvo = await getUsuarioLocal();
        if (tokenSalvo && usuarioSalvo) {
          setToken(tokenSalvo);
          setUsuario(usuarioSalvo);
        }
      } catch (e) {
        console.log('Erro ao restaurar sessão', e);
      } finally {
        setCarregando(false);
      }
    };
    restaurarSessao();
  }, []);

  const login = (dadosUsuario, tokenJWT) => {
    setUsuario(dadosUsuario);
    setToken(tokenJWT);
  };

  const logout = async () => {
    await apiLogout();
    setUsuario(null);
    setToken(null);
  };

  const atualizarUsuario = (novosDados) => {
    setUsuario((prev) => ({ ...prev, ...novosDados }));
    AsyncStorage.setItem('user', JSON.stringify({ ...usuario, ...novosDados }));
  };

  return (
    <AuthContext.Provider value={{ usuario, token, carregando, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
