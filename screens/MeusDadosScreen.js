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
import BotaoVoltar from "../components/BotaoVoltar";

export default function MeusDadosScreen({ navigation }) {
  const [nome, setNome] = useState("Guilherme Martins");
  const [email, setEmail] = useState("guilherme@email.com");
  const [senha, setSenha] = useState("123456"); 
  const [editando, setEditando] = useState(false);

  const pedidos = [
    { id: 1, produto: "Notebook Gamer", valor: "R$ 4.500,00" },
    { id: 2, produto: "Mouse RGB", valor: "R$ 150,00" },
    { id: 3, produto: "Teclado Mecânico", valor: "R$ 320,00" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header com Logo e Ícones */}
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
            {/* ATALHO NO LOGO: Leva para a Home */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.colunaDireita}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/acessibilidade.png")}
                style={styles.iconePadrao}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Carrinho")}
            >
              <Image
                source={require("../assets/carrinho.png")}
                style={styles.iconePadrao}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Faixa Azul com Botão Voltar e Título */}
      <View style={styles.faixaAzul}>
        <BotaoVoltar navigation={navigation} />
        <Text style={styles.tituloTela}>Meus Dados</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView style={styles.container}>
        {/* Card de Dados Pessoais */}
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
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text> 
          <TextInput
            style={styles.input}
            value={senha}
            editable={editando}
            onChangeText={setSenha}
            secureTextEntry={true} // Oculta a senha
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

        {/* Card de Histórico */}
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
    flex: 2, 
    alignItems: "center",
  },
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logo: {
    width: 150, 
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
    height: 60,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  tituloTela: {
    color: COLORS.white,
    fontSize: 18,
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
    elevation: 2,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    color: COLORS.primary,
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
    marginTop: 20,
    padding: 15,
    alignItems: "center",
    borderRadius: 6,
  },
  botaoTexto: {
    color: COLORS.white,
    fontWeight: "700",
  },
  pedidoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
  },
  pedidoTexto: {
    fontSize: 14,
    fontWeight: "600",
  },
  pedidoValor: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});