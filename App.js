// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from './context/AuthContext';

// ── Telas de usuário ──
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import CadastroScreen from './screens/CadastroScreen';
import VerificacaoScreen from './screens/VerificacaoScreen';
import MeusDadosScreen from './screens/MeusDadosScreen';

// ── Telas de admin ──
import AdminLoginScreen from './screens/AdminLoginScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import AdminProdutosScreen from './screens/AdminProdutosScreen';
import DashboardScreen from './screens/DashboardScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#282b75" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={usuario ? 'Home' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {/* ── Públicas ── */}
        <Stack.Screen name="Login"       component={LoginScreen} />
        <Stack.Screen name="Cadastro"    component={CadastroScreen} />
        <Stack.Screen name="Verificacao" component={VerificacaoScreen} />

        {/* ── Usuário ── */}
        <Stack.Screen name="Home"        component={HomeScreen} />
        <Stack.Screen name="Carrinho"    component={CarrinhoScreen} />
        <Stack.Screen name="MeusDados"   component={MeusDadosScreen} />

        {/* ── Admin ── */}
        <Stack.Screen name="AdminLogin"    component={AdminLoginScreen} />
        <Stack.Screen name="AdminHome"     component={AdminHomeScreen} />
        <Stack.Screen name="AdminProdutos" component={AdminProdutosScreen} />
        <Stack.Screen name="Dashboard"     component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
