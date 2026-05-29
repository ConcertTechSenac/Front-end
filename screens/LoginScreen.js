// screens/LoginScreen.js — integrado com back-end
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert,
} from 'react-native';
import { apiLogin } from '../services/api';
import { useAuth } from '../context/AuthContext';

const COLORS = { darkBlue: '#282b75', cyan: '#00aeee', white: '#ffffff' };

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      const resultado = await apiLogin(email.trim(), senha);
      // Salva no contexto global
      login(resultado.user, resultado.token);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.headerAzul} />

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.titulo}>Bem-vindo!</Text>

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.botaoPrincipal, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.botaoTextoPrincipal}>ENTRAR</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => navigation.navigate('Cadastro')}
              disabled={loading}
            >
              <Text style={styles.botaoTextoSecundario}>CADASTRAR-SE</Text>
            </TouchableOpacity>

            <View style={styles.separador} />

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => navigation.navigate('AdminLogin')}
              disabled={loading}
            >
              <Text style={styles.botaoTextoSecundario}>LOGIN COMO ADMINISTRADOR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  innerContainer: { flex: 1 },
  headerAzul: { height: 60, backgroundColor: COLORS.darkBlue },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 30 },
  logo: { width: 180, height: 60, alignSelf: 'center', marginBottom: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: COLORS.darkBlue, marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, marginBottom: 15, color: '#333' },
  botaoPrincipal: { backgroundColor: COLORS.darkBlue, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  botaoTextoPrincipal: { color: COLORS.white, fontWeight: 'bold' },
  botaoSecundario: { borderWidth: 1, borderColor: COLORS.cyan, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  botaoTextoSecundario: { color: COLORS.cyan, fontWeight: 'bold' },
  separador: { height: 1, backgroundColor: '#eee', marginVertical: 5 },
});
