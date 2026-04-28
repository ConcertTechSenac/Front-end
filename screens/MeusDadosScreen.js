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
<<<<<<< HEAD
import BotaoVoltar from "../components/BotaoVoltar";
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660

export default function MeusDadosScreen({ navigation }) {
  const [nome, setNome] = useState("Guilherme Martins");
  const [email, setEmail] = useState("guilherme@email.com");
<<<<<<< HEAD
<<<<<<< HEAD
  const [senha, setSenha] = useState("123456");
=======
  const [telefone, setTelefone] = useState("(11) 99999-9999");
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
  const [senha, setSenha] = useState("123456");
>>>>>>> origin/Main
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
<<<<<<< HEAD
            <Image
              source={require("../assets/menu.png")}
              style={styles.iconeMenu}
            />
          </View>

          <View style={styles.colunaCentral}>
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
=======
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/menu.png")}
                style={styles.iconeMenu}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.colunaCentral}>
<<<<<<< HEAD
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
            />
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
            {/* ATALHO NO LOGO: Agora leva para a Home ao clicar na foto */}
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
>>>>>>> origin/Main
          </View>

          <View style={styles.colunaDireita}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/acessibilidade.png")}
                style={styles.iconePadrao}
              />
            </TouchableOpacity>

<<<<<<< HEAD
<<<<<<< HEAD
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Carrinho")}
            >
=======
            <TouchableOpacity style={styles.iconBtn}>
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Carrinho")}
            >
>>>>>>> origin/Main
              <Image
                source={require("../assets/carrinho.png")}
                style={styles.iconePadrao}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.faixaAzul}>
<<<<<<< HEAD
        {/* ✅ BOTÃO VOLTAR */}
        <BotaoVoltar navigation={navigation} />
=======
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.seta}>←</Text>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660

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

<<<<<<< HEAD
<<<<<<< HEAD
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            editable={editando}
            onChangeText={setSenha}
            secureTextEntry={true}
=======
          <Text style={styles.label}>Telefone</Text>
=======
          <Text style={styles.label}>Senha</Text> 
>>>>>>> origin/Main
          <TextInput
            style={styles.input}
            value={senha}
            editable={editando}
<<<<<<< HEAD
            onChangeText={setTelefone}
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
            onChangeText={setSenha}
            secureTextEntry={true}
>>>>>>> origin/Main
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
<<<<<<< HEAD
<<<<<<< HEAD
    flex: 2,
=======
    flex: 1,
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
    flex: 2,
>>>>>>> origin/Main
    alignItems: "center",
  },
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logo: {
    width: 200,
<<<<<<< HEAD
<<<<<<< HEAD
    height: 40,
=======
    height: 42,
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
    height: 40,
>>>>>>> origin/Main
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
<<<<<<< HEAD
=======
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
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
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
<<<<<<< HEAD
<<<<<<< HEAD
    fontWeight: "800",
=======
    fontWeight: "700",
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
    fontWeight: "800",
>>>>>>> origin/Main
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
<<<<<<< HEAD
<<<<<<< HEAD
    color: "#333",
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
    color: "#333",
>>>>>>> origin/Main
  },
  botaoEditar: {
    backgroundColor: COLORS.primary,
    marginTop: 16,
    padding: 12,
    alignItems: "center",
<<<<<<< HEAD
<<<<<<< HEAD
    borderRadius: 4,
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
    borderRadius: 4,
>>>>>>> origin/Main
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
<<<<<<< HEAD
});
=======
});
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
