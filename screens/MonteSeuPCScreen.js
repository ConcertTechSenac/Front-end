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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
});