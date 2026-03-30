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

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');

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

          <Text style={styles.title}>Acesse sua conta ou cadastre-se</Text>

          <TextInput
            style={styles.input}
            placeholder="Email/CPF ou CNPJ"
            placeholderTextColor={COLORS.gray400}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="done"
          />

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.primaryButtonText}>CONTINUAR</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
            <Text style={styles.googleButtonText}>Continuar com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookButton} activeOpacity={0.8}>
            <Text style={styles.facebookButtonText}>Continuar com Facebook</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
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
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.gray100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  googleButtonText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 15,
  },
  facebookButton: {
    width: '100%',
    height: 50,
    borderColor: COLORS.primaryLight,
    borderWidth: 1.5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  facebookButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  spacer: {
    height: 24,
  },
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
});
