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
<<<<<<< HEAD
<<<<<<< HEAD
  Alert,
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
  Alert,
>>>>>>> origin/Main
} from 'react-native';
import COLORS from '../constants/colors';

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoWidth = Math.min(width * 0.45, 200);
  const logoHeight = logoWidth * 0.62;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/Main
  const handleLogin = () => {

    if (!email.includes('@')) {
      Alert.alert('Atenção', 'O endereço de email tem de conter o símbolo "@".');
      return;
    }

    const quantidadeNumeros = (password.match(/\d/g) || []).length;
    if (quantidadeNumeros < 3) {
      Alert.alert('Atenção', 'A senha tem de conter pelo menos 3 números.');
      return;
    }

    navigation.navigate('Home');
  };

<<<<<<< HEAD
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
>>>>>>> origin/Main
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

          <Text style={styles.title}>Acesse sua conta ou cadastre-se</Text>

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

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={COLORS.gray400}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="done"
          />

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
<<<<<<< HEAD
<<<<<<< HEAD
            onPress={handleLogin} // MODIFICADO: Chama a função de validação
=======
            onPress={() => navigation.navigate('Home')}
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
            onPress={handleLogin} // MODIFICADO: Chama a função de validação
>>>>>>> origin/Main
          >
            <Text style={styles.primaryButtonText}>CONTINUAR</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

<<<<<<< HEAD
<<<<<<< HEAD
=======
          {/* MODIFICADO: Agora este botão navega para a tela de Cadastro */}
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
>>>>>>> origin/Main
          <TouchableOpacity 
            style={styles.cadastroButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.cadastroButtonText}>Cadastre-se</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </ScrollView>

        <View style={styles.footer}>
<<<<<<< HEAD
<<<<<<< HEAD
          
=======
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
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
          
>>>>>>> origin/Main
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
    paddingTop: 48,
    paddingBottom: 20,
  },
  logo: {
    marginBottom: 24,
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
    marginBottom: 16,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  dividerText: {
    marginHorizontal: 12,
    color: COLORS.gray400,
    fontSize: 14,
    fontWeight: '500',
  },
  cadastroButton: {
    width: '100%',
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cadastroButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  spacer: {
    height: 24,
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerItem: {
    padding: 6,
  },
  footerText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
>>>>>>> origin/Main
});