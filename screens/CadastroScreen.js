<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import BotaoVoltar from "../components/BotaoVoltar";

const COLORS = {
  darkBlue: "#282b75",
  cyan: "#00aeee",
  white: "#ffffff",
};

function Estrelas() {
  const [rating, setRating] = useState(0);

  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity key={item} onPress={() => setRating(item)}>
          <Text style={{ fontSize: 20 }}>
            {item <= rating ? "⭐" : "☆"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CardProduto({ navigation }) {
  return (
    <View style={styles.card}>
      <Estrelas />
      <View style={styles.imagemPlaceholder} />
      <TouchableOpacity
        style={styles.botaoComprar}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Carrinho")}
      >
        <Text style={styles.botaoComprarTexto}>COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CadastroScreen({ navigation }) {
  const [buscaHardware, setBuscaHardware] = useState("");
=======
import React, { useState } from 'react';
=======
import React, { useState } from "react";
>>>>>>> origin/Main
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";

const COLORS = {
  darkBlue: "#282b75",
  cyan: "#00aeee",
  white: "#ffffff",
};

<<<<<<< HEAD
  const logoWidth = Math.min(width * 0.45, 200);
  const logoHeight = logoWidth * 0.62;
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======
function Estrelas() {
  const [rating, setRating] = useState(0);

  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity key={item} onPress={() => setRating(item)}>
          <Text style={{ fontSize: 20 }}>
            {item <= rating ? "⭐" : "☆"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CardProduto({ navigation }) {
  return (
    <View style={styles.card}>
      <Estrelas />

      <View style={styles.imagemPlaceholder} />

      <TouchableOpacity
        style={styles.botaoComprar}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Carrinho")}
      >
        <Text style={styles.botaoComprarTexto}>COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MaisVendidosScreen({ navigation }) {

  const [buscaHardware, setBuscaHardware] = useState("");
>>>>>>> origin/Main

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/Main
      {/* Header */}
      <View style={styles.topoBranco}>
        <View style={styles.header}>
          <View style={styles.colunaEsquerda}>
<<<<<<< HEAD
            {/* ✅ BOTÃO VOLTAR */}
            <BotaoVoltar navigation={navigation} cor={COLORS.darkBlue} />
          </View>

          <View style={styles.colunaCentral}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
=======
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/menu.png")}
                style={styles.iconeMenu}
>>>>>>> origin/Main
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
<<<<<<< HEAD

          <View style={styles.colunaDireita}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/acessibilidade.png")}
                style={styles.iconePadrao}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Carrinho")}
            >
              <Image
                source={require("../assets/carrinho.png")}
                style={styles.iconePadrao}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Busca */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Image
              source={require("../assets/lupa.png")}
              style={styles.iconeLupa}
              resizeMode="contain"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Busque no HARD TECH!"
              placeholderTextColor="#a0a0cc"
              value={buscaHardware}
              onChangeText={setBuscaHardware}
            />
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.fundoAzul}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.filtroContainer}>
            <TouchableOpacity style={styles.btnFiltro} activeOpacity={0.8}>
              <Image
                source={require("../assets/filtro.png")}
                style={styles.iconeFiltro}
                resizeMode="contain"
              />
              <Text style={styles.textoFiltro}>Filtro</Text>
            </TouchableOpacity>
          </View>

          <CardProduto navigation={navigation} />
          <CardProduto navigation={navigation} />
          <CardProduto navigation={navigation} />
        </ScrollView>
      </View>
=======
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
=======
>>>>>>> origin/Main

          <View style={styles.colunaCentral}>
            {/* ✅ ATALHO NO LOGO: Clique leva para a Home */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => navigation.navigate('Home')}
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
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Carrinho")}
            >
              <Image
                source={require("../assets/carrinho.png")}
                style={styles.iconePadrao}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
<<<<<<< HEAD
      </KeyboardAvoidingView>
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
=======

        {/* Busca */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Image
              source={require("../assets/lupa.png")}
              style={styles.iconeLupa}
              resizeMode="contain"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Busque no HARD TECH!"
              placeholderTextColor="#a0a0cc"
              value={buscaHardware}
              onChangeText={setBuscaHardware}
            />
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.fundoAzul}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Filtro */}
          <View style={styles.filtroContainer}>
            <TouchableOpacity style={styles.btnFiltro} activeOpacity={0.8}>
              <Image
                source={require("../assets/filtro.png")}
                style={styles.iconeFiltro}
                resizeMode="contain"
              />
              <Text style={styles.textoFiltro}>Filtro</Text>
            </TouchableOpacity>
          </View>

          {/* Produtos */}
          <CardProduto navigation={navigation} />
          <CardProduto navigation={navigation} />
          <CardProduto navigation={navigation} />
        </ScrollView>
      </View>
>>>>>>> origin/Main
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
<<<<<<< HEAD
<<<<<<< HEAD
  topoBranco: {
    backgroundColor: COLORS.white,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  colunaEsquerda: {
    flex: 1,
    alignItems: "flex-start",
  },
  colunaCentral: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 180,
    height: 50,
  },
  iconBtn: {
    marginLeft: 15,
  },
  iconePadrao: {
    width: 24,
    height: 24,
  },
  iconeLupa: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
  },
  iconeFiltro: {
    width: 16,
    height: 16,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.white,
    fontSize: 12,
  },
  fundoAzul: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContent: {
    padding: 15,
  },
  filtroContainer: {
    marginBottom: 15,
  },
  btnFiltro: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  textoFiltro: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginBottom: 15,
  },
  imagemPlaceholder: {
    width: "100%",
    height: 120,
    marginBottom: 20,
  },
  botaoComprar: {
    backgroundColor: COLORS.cyan,
    padding: 12,
    alignItems: "center",
  },
  botaoComprarTexto: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
});
=======
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
=======
  topoBranco: {
>>>>>>> origin/Main
    backgroundColor: COLORS.white,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  colunaEsquerda: {
    flex: 1,
    alignItems: "flex-start",
  },
  colunaCentral: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 180,
    height: 50,
  },
  iconeMenu: {
    width: 24,
    height: 24,
  },
  iconBtn: {
    marginLeft: 15,
  },
  iconePadrao: {
    width: 24,
    height: 24,
  },
  iconeLupa: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
  },
  iconeFiltro: {
    width: 16,
    height: 16,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.white,
    fontSize: 12,
  },
  fundoAzul: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContent: {
    padding: 15,
  },
  filtroContainer: {
    marginBottom: 15,
  },
  btnFiltro: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  textoFiltro: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginBottom: 15,
  },
  imagemPlaceholder: {
    width: "100%",
    height: 120,
    marginBottom: 20,
  },
  botaoComprar: {
    backgroundColor: COLORS.cyan,
    padding: 12,
    alignItems: "center",
  },
  botaoComprarTexto: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
});
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
