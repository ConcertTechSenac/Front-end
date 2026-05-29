// screens/VerificacaoScreen.js — integrado com back-end
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet,
  KeyboardAvoidingView, Platform, StatusBar, SafeAreaView, Alert, ActivityIndicator,
} from 'react-native';
import { apiVerificarCodigo } from '../services/api';

const COLORS = { primary: '#282b75', white: '#ffffff', text: '#333', gray200: '#ddd', gray400: '#999', background: '#f5f5f5' };

export default function VerificacaoScreen({ navigation, route }) {
  // Recebe o email passado pela CadastroScreen
  const email = route?.params?.email || '';

  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [seconds, setSeconds] = useState(300); // 5 minutos
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const verificarCodigo = async (codigoCompleto) => {
    setLoading(true);
    try {
      const resultado = await apiVerificarCodigo(email, codigoCompleto);
      Alert.alert('Sucesso!', resultado.message, [
        { text: 'Fazer login', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) },
      ]);
    } catch (error) {
      Alert.alert('Código inválido', error.message);
      // Limpa os campos para nova tentativa
      setCode(['', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    const codigoCompleto = newCode.join('');
    if (codigoCompleto.length === 4 && newCode.every(d => d !== '')) {
      verificarCodigo(codigoCompleto);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/chave.png')} style={styles.icon} resizeMode="contain" />

          <Text style={styles.title}>Informe o código</Text>
          <Text style={styles.subtitle}>
            Digite o código de 4 dígitos enviado para{'\n'}
            <Text style={styles.bold}>{email || 'seu e-mail'}</Text>
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 40 }} />
          ) : (
            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.codeInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  value={digit}
                  ref={(ref) => (inputs.current[index] = ref)}
                  selectTextOnFocus
                />
              ))}
            </View>
          )}

          <Text style={styles.timerTitle}>Código expira em</Text>
          <Text style={[styles.timerValue, seconds === 0 && { color: 'red' }]}>
            {seconds === 0 ? 'Expirado!' : formatTime(seconds)}
          </Text>

          <TouchableOpacity
            style={[styles.reenviarButton, seconds === 0 && { backgroundColor: COLORS.primary }]}
            disabled={seconds > 0 || loading}
            onPress={() => setSeconds(300)}
          >
            <Text style={[styles.reenviarText, seconds === 0 && { color: COLORS.white }]}>
              Reenviar código
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  topBar: { paddingHorizontal: 16, paddingTop: 8 },
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 30, paddingTop: 30 },
  icon: { width: 70, height: 70, marginBottom: 20, tintColor: COLORS.primary },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1A1C3D', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', color: COLORS.text, lineHeight: 22, marginBottom: 40 },
  bold: { fontWeight: 'bold' },
  codeContainer: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: 40 },
  codeInput: { width: 60, height: 70, borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 12, backgroundColor: COLORS.background, textAlign: 'center', fontSize: 28, fontWeight: 'bold', color: COLORS.text },
  timerTitle: { fontSize: 15, color: COLORS.text, marginBottom: 5 },
  timerValue: { fontSize: 18, fontWeight: 'bold', color: '#1A1C3D', marginBottom: 40 },
  reenviarButton: { width: '100%', height: 55, backgroundColor: '#F0F0F0', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  reenviarText: { fontSize: 16, fontWeight: '700', color: COLORS.gray400 },
});
