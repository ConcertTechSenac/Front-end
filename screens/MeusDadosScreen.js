import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import COLORS from "../constants/colors";

export default function MeusDadosScreen({ navigation }) {
  const [nome, setNome] = useState("Guilherme Martins");
  const [email, setEmail] = useState("guilherme@email.com");
  const [senha, setSenha] = useState("123456"); // Alterado de telefone para senha
  const [editando, setEditando] = useState(false);

  const pedidos = [
    { id: 1, produto: "Notebook Gamer", valor: "R$ 4.500,00" },
    { id: 2, produto: "Mouse RGB", valor: "R$ 150,00" },
    { id: 3, produto: "Teclado Mecânico", valor: "R$ 320,00" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.topoBranco}>
        <View style={styles.header}>
          <View style={styles.colunaEsquerda}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/menu.png")}
                style={styles.iconeMenu}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.colunaCentral}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain" // Adicionado para ajustar a logo corretamente
            />
          </View>

          <View style={styles.colunaDireita}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/acessibilidade.png")}
                style={styles.iconePadrao}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/carrinho.png")}
                style={styles.iconePadrao}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.faixaAzul}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.seta}>←</Text>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.tituloTela}>Meus Dados</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.tituloSecao}>Dados Pessoais</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            editable={editando}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={editando}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text> 
          <TextInput
            style={styles.input}
            value={senha}
            editable={editando}
            onChangeText={setSenha}
            secureTextEntry={true} // Adicionado para ocultar os caracteres da senha
          />

          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => setEditando(!editando)}
          >
            <Text style={styles.botaoTexto}>
              {editando ? "SALVAR" : "EDITAR"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.tituloSecao}>Histórico de Pedidos</Text>

          {pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.pedidoItem}>
              <Text style={styles.pedidoTexto}>{pedido.produto}</Text>
              <Text style={styles.pedidoValor}>{pedido.valor}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topoBranco: {
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  colunaEsquerda: {
    flex: 1,
  },
  colunaCentral: {
    flex: 2, // Aumentado para dar mais espaço para a logo centralizada
    alignItems: "center",
  },
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logo: {
    width: 250, // Ajustado para um tamanho mais padrão
    height: 40,
  },
  iconeMenu: {
    width: 24,
    height: 24,
  },
  iconePadrao: {
    width: 22,
    height: 22,
  },
  iconBtn: {
    marginLeft: 14,
  },
  faixaAzul: {
    height: 72,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
  },
  seta: {
    color: COLORS.white,
    fontSize: 18,
    marginRight: 6,
    fontWeight: "bold",
  },
  textoVoltar: {
    color: COLORS.white,
    fontSize: 15,
  },
  tituloTela: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: COLORS.white,
    margin: 12,
    padding: 16,
    borderRadius: 8,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    marginTop: 10,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    color: "#333",
  },
  botaoEditar: {
    backgroundColor: COLORS.primary,
    marginTop: 16,
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  botaoTexto: {
    color: COLORS.white,
    fontWeight: "700",
  },
  pedidoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  pedidoTexto: {
    fontSize: 14,
    fontWeight: "600",
  },
  pedidoValor: {
    fontSize: 13,
    color: "#555",
  },
});