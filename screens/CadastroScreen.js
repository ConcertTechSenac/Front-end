import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import COLORS from '../constants/colors';

export default function CadastroScreen({ navigation }) {
  const { width } = useWindowDimensions();
  
  // Estados para os campos de cadastro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const logoWidth = Math.min(width * 0.45, 200);
  const logoHeight = logoWidth * 0.62;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../assets/logo.png')}
            style={[styles.logo, { width: logoWidth, height: logoHeight }]}
            resizeMode="contain"
          />

          <Text style={styles.title}>Crie sua conta preenchendo os dados abaixo</Text>

          {/* Campo Nome e Sobrenome */}
          <TextInput
            style={styles.input}
            placeholder="Nome e Sobrenome"
            placeholderTextColor={COLORS.gray400}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            returnKeyType="next"
          />

          {/* Campo Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.gray400}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />

          {/* Campo Senha */}
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={COLORS.gray400}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="next"
          />

          {/* Campo Confirmar Senha */}
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor={COLORS.gray400}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="done"
          />
{/* Botão Confirmar (Azul igual ao Continuar) */}
<TouchableOpacity
  style={styles.primaryButton}
  activeOpacity={0.8}
  onPress={() => {
      console.log("Cadastro realizado!");
      // Agora ele navega para a tela do código de 4 dígitos:
      navigation.navigate('Verificacao'); 
  }}
>
  <Text style={styles.primaryButtonText}>CONFIRMAR</Text>
</TouchableOpacity>
          {/* Link para voltar ao Login se já tiver conta */}
          <TouchableOpacity 
            style={styles.voltarLogin} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.voltarLoginText}>
                Já tem uma conta? <Text style={{fontWeight: '700'}}>Faça login</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Footer mantido conforme solicitado */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('MaisVendidos')}>
            <Text style={styles.footerText}>Departamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Text style={styles.footerText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Text style={styles.footerText}>Minha Conta</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 30, // Reduzi um pouco para caber mais campos na tela
    paddingBottom: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.gray200,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12, // Reduzi o espaçamento entre campos
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary, // Cor azul original
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  voltarLogin: {
    padding: 10,
  },
  voltarLoginText: {
    color: COLORS.text,
    fontSize: 14,
  },
  spacer: {
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerItem: {
    padding: 6,
  },
  footerText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
});