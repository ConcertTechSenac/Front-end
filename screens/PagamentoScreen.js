import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
<<<<<<< HEAD
import BotaoVoltar from "../components/BotaoVoltar";
=======
>>>>>>> origin/Main

export default function PagamentoScreen({ navigation }) {
  const [metodo, setMetodo] = useState(null);

  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const [erroNumero, setErroNumero] = useState("");
  const [erroCvv, setErroCvv] = useState("");

  const valorOriginal = 5000;
  const valorPix = valorOriginal * 0.95;

  function validarCartao() {
    let valido = true;

    if (numero.length !== 16) {
      setErroNumero("Número do cartão inválido");
      valido = false;
    } else {
      setErroNumero("");
    }

    if (cvv.length !== 3) {
      setErroCvv("CVV inválido");
      valido = false;
    } else {
      setErroCvv("");
    }

    return valido;
  }

  function confirmarPagamento() {
    if (metodo === "cartao") {
      if (!validarCartao()) return;
    }

<<<<<<< HEAD
    Alert.alert("Sucesso", "Compra concluída com sucesso!", [
      {
        text: "Ir para Home →",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
=======
    Alert.alert(
      "Sucesso",
      "Compra concluída com sucesso!",
      [
        {
          text: "Ir para Home →",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
>>>>>>> origin/Main
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

<<<<<<< HEAD
      {/* ✅ BOTÃO VOLTAR no topo, sobre fundo branco */}
      <View style={styles.topBar}>
        <BotaoVoltar navigation={navigation} cor={COLORS.primary} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
=======
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* LOGO CENTRAL */}
>>>>>>> origin/Main
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.title}>Pagamento</Text>

        <View style={styles.valorBox}>
          <Text style={styles.valorLabel}>Valor total</Text>
          <Text style={styles.valor}>
<<<<<<< HEAD
            R${" "}
            {metodo === "pix"
              ? valorPix.toFixed(2)
              : valorOriginal.toFixed(2)}
=======
            R$ {metodo === "pix" ? valorPix.toFixed(2) : valorOriginal.toFixed(2)}
>>>>>>> origin/Main
          </Text>
          {metodo === "pix" && (
            <Text style={styles.desconto}>5% de desconto aplicado</Text>
          )}
        </View>

        <Text style={styles.subTitle}>Forma de pagamento</Text>

        <View style={styles.metodos}>
          <TouchableOpacity
            style={[
              styles.metodoBtn,
              metodo === "cartao" && styles.metodoSelecionado,
            ]}
            onPress={() => setMetodo("cartao")}
          >
            <Text style={styles.metodoText}>Crédito / Débito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.metodoBtn,
              metodo === "pix" && styles.metodoSelecionado,
            ]}
            onPress={() => setMetodo("pix")}
          >
            <Text style={styles.metodoText}>PIX</Text>
          </TouchableOpacity>
        </View>

        {metodo === "pix" && (
          <View style={styles.box}>
            <Text style={styles.label}>Escaneie o QR Code</Text>

            <View style={styles.qrFake}>
              <Text style={{ fontWeight: "600" }}>QR CODE</Text>
            </View>

            <Text style={styles.link}>pix://pagamento123456789</Text>

            <TouchableOpacity style={styles.copyBtn}>
              <Text style={styles.copyText}>Copiar código</Text>
            </TouchableOpacity>
          </View>
        )}

        {metodo === "cartao" && (
          <View style={styles.box}>
            <TextInput
              placeholder="Número do cartão"
              style={styles.input}
              keyboardType="numeric"
              maxLength={16}
              value={numero}
              onChangeText={setNumero}
            />
<<<<<<< HEAD
            {erroNumero !== "" && (
              <Text style={styles.erro}>{erroNumero}</Text>
            )}
=======
            {erroNumero !== "" && <Text style={styles.erro}>{erroNumero}</Text>}
>>>>>>> origin/Main

            <TextInput
              placeholder="Nome no cartão"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              placeholder="Validade (MM/AA)"
              style={styles.input}
              maxLength={5}
              value={validade}
              onChangeText={setValidade}
            />

            <TextInput
              placeholder="CVV"
              style={styles.input}
              keyboardType="numeric"
              maxLength={3}
              value={cvv}
              onChangeText={setCvv}
            />
            {erroCvv !== "" && <Text style={styles.erro}>{erroCvv}</Text>}
          </View>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={confirmarPagamento}
        >
<<<<<<< HEAD
          <Text style={styles.primaryButtonText}>CONFIRMAR PAGAMENTO</Text>
=======
          <Text style={styles.primaryButtonText}>
            CONFIRMAR PAGAMENTO
          </Text>
>>>>>>> origin/Main
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
<<<<<<< HEAD
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
=======
>>>>>>> origin/Main
  content: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },
  valorBox: {
    width: "100%",
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  valorLabel: {
    fontSize: 13,
    color: COLORS.gray400,
  },
  valor: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 5,
  },
  desconto: {
    color: "green",
    marginTop: 5,
    fontSize: 12,
  },
  subTitle: {
    width: "100%",
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 10,
  },
  metodos: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    width: "100%",
  },
  metodoBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
  },
  metodoSelecionado: {
    borderColor: COLORS.primary,
    backgroundColor: "#EAF3FF",
  },
  metodoText: {
    fontWeight: "600",
    color: COLORS.text,
  },
  box: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: "600",
    color: COLORS.text,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: COLORS.background,
    color: COLORS.text,
  },
  erro: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  qrFake: {
    height: 160,
    backgroundColor: COLORS.gray200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  link: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 10,
  },
  copyBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  copyText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  primaryButton: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    letterSpacing: 1,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> origin/Main
