// screens/AdminLoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { apiLoginAdmin } from "../services/api";

const COLORS = { darkBlue: "#282b75", cyan: "#00aeee", white: "#ffffff" };

export default function AdminLoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha o usuário e a senha.");
      return;
    }

    setLoading(true);
    try {
      // Valida credenciais no banco de dados
      await apiLoginAdmin(usuario.trim(), senha);

      // Credenciais corretas — vai para o painel admin
      navigation.reset({ index: 0, routes: [{ name: "AdminHome" }] });
    } catch (error) {
      Alert.alert("Acesso negado", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.headerAzul} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.titulo}>Área do Administrador</Text>
            <Text style={styles.subtitulo}>Acesso restrito</Text>

            <TextInput
              style={styles.input}
              placeholder="Usuário"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
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
              onPress={handleAdminLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.botaoTextoPrincipal}>ENTRAR</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.botaoTextoSecundario}>
                VOLTAR PARA LOGIN NORMAL
              </Text>
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
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 30 },
  logo: { width: 180, height: 150, alignSelf: "center", marginBottom: 10 },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: "#333",
  },
  botaoPrincipal: {
    backgroundColor: COLORS.darkBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTextoPrincipal: { color: COLORS.white, fontWeight: "bold" },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: COLORS.cyan,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  botaoTextoSecundario: { color: COLORS.cyan, fontWeight: "bold" },
});
