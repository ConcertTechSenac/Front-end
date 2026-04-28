import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, KeyboardAvoidingView, Platform, ScrollView, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native';

const COLORS = { darkBlue: '#282b75', cyan: '#00aeee', white: '#ffffff' };

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Lógica de login do usuário comum (futuramente integrada com o back-end)
    // Por enquanto, apenas navega para a Home
    navigation.navigate('Home');
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
            {/* Logo do App */}
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
            />
            
            <TextInput 
              style={styles.input} 
              placeholder="Senha" 
              secureTextEntry 
              value={senha} 
              onChangeText={setSenha}
            />

            {/* Botão Principal de Login do Usuário */}
            <TouchableOpacity style={styles.botaoPrincipal} onPress={handleLogin}>
              <Text style={styles.botaoTextoPrincipal}>ENTRAR</Text>
            </TouchableOpacity>

            {/* Botão Secundário para Cadastro de Usuário */}
            <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.botaoTextoSecundario}>CADASTRAR-SE</Text>
            </TouchableOpacity>

            {/* Linha separadora visual */}
            <View style={styles.separador} />

            {/* Botão de Administrador Corrigido: Navega para a tela de Login do Admin */}
            <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('AdminLogin')}>
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
  
  // Estilo compartilhado para os botões secundários (Cadastro e Administrador)
  botaoSecundario: { borderWidth: 1, borderColor: COLORS.cyan, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  botaoTextoSecundario: { color: COLORS.cyan, fontWeight: 'bold' },

  separador: { height: 1, backgroundColor: '#eee', marginVertical: 5 }
});