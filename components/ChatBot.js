// components/ChatBot.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { BASE_URL } from "../services/api";

const COLORS = {
  darkBlue: "#282b75",
  cyan: "#00aeee",
  white: "#ffffff",
  background: "#f0f2f8",
  text: "#2c3e50",
  textLight: "#7f8c8d",
};

const MENSAGEM_BOAS_VINDAS = {
  id: "0",
  role: "assistant",
  text: "Olá! 👋 Sou o assistente virtual da Hard Tech. Posso te ajudar com dúvidas sobre produtos, pedidos, conta e muito mais. Como posso te ajudar?",
};

function Mensagem({ item }) {
  const isUser = item.role === "user";
  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowBot]}>
      {!isUser && (
        <View style={styles.avatarBot}>
          <Text style={{ fontSize: 16 }}>🤖</Text>
        </View>
      )}
      <View
        style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}
      >
        <Text
          style={[
            styles.bubbleText,
            isUser ? styles.bubbleTextUser : styles.bubbleTextBot,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );
}

export default function ChatBot() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState([MENSAGEM_BOAS_VINDAS]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (aberto) {
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        200,
      );
    }
  }, [mensagens, aberto]);

  const enviar = async () => {
    const texto = input.trim();
    if (!texto || carregando) return;

    setInput("");

    const msgUser = { id: Date.now().toString(), role: "user", text: texto };
    const novaLista = [...mensagens, msgUser];
    setMensagens(novaLista);
    setCarregando(true);

    try {
      // Monta histórico excluindo a mensagem de boas-vindas
      const historico = novaLista
        .filter((m) => m.id !== "0")
        .map((m) => ({ role: m.role, content: m.text }));

      const response = await fetch(
        `${BASE_URL.replace("/api/auth", "")}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mensagens: historico }),
        },
      );

      const data = await response.json();

      setMensagens((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: data.resposta || "Desculpe, não consegui responder agora.",
        },
      ]);
    } catch {
      setMensagens((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: "Ops! Problema de conexão. Tente novamente. 😅",
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <TouchableOpacity style={styles.fab} onPress={() => setAberto(true)}>
        <Text style={styles.fabIcone}>💬</Text>
      </TouchableOpacity>

      {/* Modal do chat */}
      <Modal
        visible={aberto}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAberto(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.chatWrapper}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.headerAvatar}>
                    <Text style={{ fontSize: 20 }}>🤖</Text>
                  </View>
                  <View>
                    <Text style={styles.headerNome}>Assistente Hard Tech</Text>
                    <View style={styles.headerStatus}>
                      <View style={styles.dot} />
                      <Text style={styles.headerStatusText}>Online</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setAberto(false)}
                  style={styles.btnFechar}
                >
                  <Text style={styles.btnFecharText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Mensagens */}
              <FlatList
                ref={flatListRef}
                data={mensagens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Mensagem item={item} />}
                style={styles.lista}
                contentContainerStyle={{ padding: 16, paddingBottom: 12 }}
                showsVerticalScrollIndicator={false}
              />

              {/* Digitando */}
              {carregando && (
                <View style={styles.digitando}>
                  <ActivityIndicator size="small" color={COLORS.cyan} />
                  <Text style={styles.digitandoText}>Digitando...</Text>
                </View>
              )}

              {/* Sugestões */}
              {mensagens.length === 1 && !carregando && (
                <View style={styles.sugestoes}>
                  {[
                    "📦 Rastrear pedido",
                    "🔧 Suporte técnico",
                    "💻 Ver produtos",
                    "👤 Minha conta",
                  ].map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={styles.sugestao}
                      onPress={() => {
                        setInput(s.slice(3));
                      }}
                    >
                      <Text style={styles.sugestaoText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Input */}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua mensagem..."
                  placeholderTextColor={COLORS.textLight}
                  value={input}
                  onChangeText={setInput}
                  multiline
                  maxLength={500}
                  editable={!carregando}
                />
                <TouchableOpacity
                  style={[
                    styles.btnEnviar,
                    (!input.trim() || carregando) && styles.btnEnviarOff,
                  ]}
                  onPress={enviar}
                  disabled={!input.trim() || carregando}
                >
                  <Text style={styles.btnEnviarIcon}>➤</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 999,
  },
  fabIcone: { fontSize: 24 },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chatWrapper: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "88%",
  },

  header: {
    backgroundColor: COLORS.darkBlue,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerNome: { color: COLORS.white, fontWeight: "700", fontSize: 15 },
  headerStatus: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2ecc71",
    marginRight: 5,
  },
  headerStatusText: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  btnFechar: { padding: 6 },
  btnFecharText: { color: COLORS.white, fontSize: 18, fontWeight: "600" },

  lista: { flex: 1 },

  row: { flexDirection: "row", marginBottom: 12, alignItems: "flex-end" },
  rowUser: { justifyContent: "flex-end" },
  rowBot: { justifyContent: "flex-start" },
  avatarBot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    elevation: 1,
  },
  bubbleUser: { backgroundColor: COLORS.darkBlue, borderBottomRightRadius: 4 },
  bubbleBot: { backgroundColor: COLORS.white, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextUser: { color: COLORS.white },
  bubbleTextBot: { color: COLORS.text },

  digitando: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  digitandoText: { color: COLORS.textLight, fontSize: 13, marginLeft: 8 },

  sugestoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 6,
  },
  sugestao: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cyan,
  },
  sugestaoText: { color: COLORS.darkBlue, fontSize: 12, fontWeight: "600" },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.white,
    margin: 12,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    maxHeight: 100,
    paddingVertical: 4,
  },
  btnEnviar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  btnEnviarOff: { backgroundColor: "#bdc3c7" },
  btnEnviarIcon: { color: COLORS.white, fontSize: 14 },
});
