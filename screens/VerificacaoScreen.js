import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
<<<<<<< HEAD
  Alert,
} from 'react-native';
import COLORS from '../constants/colors';
import BotaoVoltar from '../components/BotaoVoltar';
=======
  Alert
} from 'react-native';
import COLORS from '../constants/colors';
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660

export default function VerificacaoScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);
<<<<<<< HEAD
  const [seconds, setSeconds] = useState(84);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => setSeconds((s) => s - 1), 1000);
=======
  const [seconds, setSeconds] = useState(84); 

  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `00:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

<<<<<<< HEAD
=======
  // FUNÇÃO QUE CONTROLA A DIGITAÇÃO E NAVEGAÇÃO
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

<<<<<<< HEAD
    if (text !== '' && index < 3) {
      inputs.current[index + 1].focus();
    }

    const codigoCompleto = newCode.join('');
    if (codigoCompleto.length === 4) {
      setTimeout(() => {
        Alert.alert('Sucesso', 'E-mail confirmado com sucesso!');
        navigation.navigate('Login');
      }, 400);
=======
    // 1. Move o foco para o próximo buraquinho se não for o último
    if (text !== '' && index < 3) {
      inputs.current[index + 1].focus();
    }
    
    // 2. LÓGICA DE NAVEGAÇÃO AUTOMÁTICA:
    // Verifica se todos os 4 campos estão preenchidos
    const codigoCompleto = newCode.join('');
    if (codigoCompleto.length === 4) {
       // Pequeno atraso para o usuário ver o número entrando antes de mudar de tela
       setTimeout(() => {
         // Aqui você define para onde ele vai após validar. 
         // Geralmente volta para o Login para ele entrar com a nova conta.
         Alert.alert("Sucesso", "E-mail confirmado com sucesso!");
         navigation.navigate('Login'); 
       }, 400);
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
<<<<<<< HEAD

      {/* ✅ BOTÃO VOLTAR no topo */}
      <View style={styles.topBar}>
        <BotaoVoltar navigation={navigation} cor={COLORS.primary} />
      </View>

      <KeyboardAvoidingView
=======
      
      <KeyboardAvoidingView 
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
<<<<<<< HEAD
          <Image
            source={require('../assets/chave.png')}
            style={styles.icon}
            resizeMode="contain"
          />

          <Text style={styles.title}>Informe o código</Text>

=======
          <Image 
            source={require('../assets/chave.png')} 
            style={styles.icon} 
            resizeMode="contain" 
          />

          <Text style={styles.title}>Informe o código</Text>
          
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
          <Text style={styles.subtitle}>
            Informe no campo abaixo o código recebido via {'\n'}
            <Text style={styles.bold}>e-mail</Text>
          </Text>

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
<<<<<<< HEAD
                selectTextOnFocus
=======
                selectTextOnFocus // Facilita se o usuário clicar para corrigir
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
              />
            ))}
          </View>

          <Text style={styles.timerTitle}>Código irá expirar em</Text>
          <Text style={styles.timerValue}>{formatTime(seconds)}</Text>

<<<<<<< HEAD
          <TouchableOpacity
            style={[
              styles.reenviarButton,
              seconds === 0 && { backgroundColor: COLORS.primary },
            ]}
            disabled={seconds > 0}
            onPress={() => setSeconds(84)}
          >
            <Text
              style={[
                styles.reenviarText,
                seconds === 0 && { color: COLORS.white },
              ]}
            >
=======
          <TouchableOpacity 
            style={[styles.reenviarButton, seconds === 0 && { backgroundColor: COLORS.primary }]}
            disabled={seconds > 0}
            onPress={() => setSeconds(84)} // Reinicia o timer ao clicar em reenviar
          >
            <Text style={[styles.reenviarText, seconds === 0 && { color: COLORS.white }]}>
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
              Reenviar
            </Text>
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
<<<<<<< HEAD
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
<<<<<<< HEAD
    paddingTop: 30,
=======
    paddingTop: 60,
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 20,
<<<<<<< HEAD
    tintColor: COLORS.primary,
=======
    tintColor: COLORS.primary, 
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1C3D',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 40,
  },
  bold: {
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 40,
  },
  codeInput: {
    width: 60,
    height: 70,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timerTitle: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 5,
  },
  timerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1C3D',
    marginBottom: 40,
  },
  reenviarButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reenviarText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray400,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
