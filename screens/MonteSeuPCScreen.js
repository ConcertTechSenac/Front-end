<<<<<<< HEAD
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
  Alert,
} from 'react-native';
import COLORS from '../constants/colors';

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoWidth = Math.min(width * 0.45, 200);
  const logoHeight = logoWidth * 0.62;

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
            onPress={handleLogin} 
          >
            <Text style={styles.primaryButtonText}>CONTINUAR</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

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
          
        </View>
      </KeyboardAvoidingView>
=======
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

const COLORS = {
  darkBlue: "#282b75",
  cyan: "#00aeee",
  white: "#ffffff",
  darker: "#1a1c4d",
};

const HARDWARE = {
  monitores: [
    { id: 1, nome: "Monitor 24'' 144Hz", preco: 899 },
    { id: 2, nome: "Monitor 27'' QHD 165Hz", preco: 1799 },
    { id: 3, nome: "Monitor 27'' 240Hz PRO", preco: 2450 },
  ],
  cpu: [
    { id: 4, nome: "Ryzen 5 5600", preco: 850 },
    { id: 5, nome: "Intel i5 13400F", preco: 1200 },
    { id: 6, nome: "Ryzen 7 5700X", preco: 1500 },
  ],
  gpu: [
    { id: 7, nome: "RTX 4060", preco: 2000 },
    { id: 8, nome: "RX 7600", preco: 1800 },
    { id: 9, nome: "RTX 4070 Super", preco: 4200 },
  ],
  ram: [
    { id: 10, nome: "16GB DDR4", preco: 350 },
    { id: 11, nome: "32GB DDR4", preco: 650 },
    { id: 12, nome: "32GB DDR5", preco: 900 },
  ],
  gabinete: [
    { id: 13, nome: "Gabinete Airflow RGB", preco: 300 },
    { id: 14, nome: "Gabinete Aquário", preco: 500 },
    { id: 15, nome: "Gabinete Premium PRO", preco: 800 },
  ],
  teclado: [
    { id: 16, nome: "Teclado Mecânico RGB", preco: 250 },
    { id: 17, nome: "Teclado 60% Wireless", preco: 400 },
    { id: 18, nome: "Teclado Magnético PRO", preco: 700 },
  ],
  mouse: [
    { id: 19, nome: "Mouse 8000 DPI", preco: 120 },
    { id: 20, nome: "Mouse 16000 DPI RGB", preco: 220 },
    { id: 21, nome: "Mouse PRO Wireless", preco: 450 },
  ],
  mousepad: [
    { id: 22, nome: "Mousepad Médio", preco: 50 },
    { id: 23, nome: "Mousepad XXL", preco: 100 },
    { id: 24, nome: "Mousepad PRO Speed", preco: 180 },
  ],
};

const STEPS = Object.keys(HARDWARE);

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🔥 Vamos montar seu setup!\nEscolha um MONITOR:",
      sender: "bot",
      products: HARDWARE.monitores,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(0);

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);

    const nextStep = step + 1;
    let nextMessage;

    if (nextStep < STEPS.length) {
      setStep(nextStep);

      nextMessage = {
        id: Date.now(),
        text: `🔥 Escolha agora: ${STEPS[nextStep].toUpperCase()}`,
        sender: "bot",
        products: HARDWARE[STEPS[nextStep]],
      };
    } else {
      // FINALIZA E MOSTRA RESUMO
      setStep(STEPS.length - 1);

      nextMessage = {
        id: Date.now(),
        text: "🛒 Seu setup está pronto! Veja o resumo abaixo 👇",
        sender: "bot",
      };
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() - 1,
        text: `Escolhi: ${item.nome}`,
        sender: "user",
      },
      nextMessage,
    ]);
  };

  const total = cart.reduce((sum, item) => sum + item.preco, 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <View
              style={[
                styles.bubble,
                item.sender === "user" ? styles.user : styles.bot,
              ]}
            >
              <Text>{item.text}</Text>
            </View>

            {item.products && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.products.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.card}
                    onPress={() => addToCart(p)}
                  >
                    <Text style={styles.title}>{p.nome}</Text>
                    <Text style={styles.price}>R$ {p.preco}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      />

      {/* ✅ RESUMO FINAL */}
      {step === STEPS.length - 1 && (
        <View style={styles.checkout}>
          <Text style={styles.checkoutTitle}>🧾 Resumo da Build</Text>

          {cart.map((item, index) => (
            <Text key={index} style={styles.item}>
              • {item.nome} - R$ {item.preco}
            </Text>
          ))}

          <Text style={styles.total}>
            Total: R$ {total.toLocaleString("pt-BR")}
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>FINALIZAR COMPRA</Text>
          </TouchableOpacity>
        </View>
      )}
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },

  bubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },

  bot: {
    backgroundColor: "#fff",
  },

  user: {
    backgroundColor: COLORS.cyan,
    alignSelf: "flex-end",
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 12,
  },

  price: {
    color: COLORS.cyan,
    marginTop: 5,
  },

  checkout: {
    backgroundColor: "#fff",
    padding: 15,
  },

  checkoutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },

  item: {
    fontSize: 14,
    marginBottom: 5,
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  button: {
    backgroundColor: COLORS.cyan,
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  },
});