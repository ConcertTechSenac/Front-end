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
<<<<<<< HEAD
import BotaoVoltar from "../components/BotaoVoltar";
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660

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
<<<<<<< HEAD
      <View style={styles.imagemPlaceholder} />
=======

      <View style={styles.imagemPlaceholder} />

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
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
  const [busca, setBusca] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

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
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

<<<<<<< HEAD
=======
          <View style={styles.colunaCentral}>
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
          </View>

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
          <View style={styles.colunaDireita}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/acessibilidade.png")}
                style={styles.iconePadrao}
                resizeMode="contain"
              />
            </TouchableOpacity>

<<<<<<< HEAD
=======
            {/* BOTÃO CARRINHO FUNCIONANDO */}
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
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
              placeholder="Busque no HARD!"
              placeholderTextColor="#a0a0cc"
              value={busca}
              onChangeText={setBusca}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  topoBranco: {
    backgroundColor: COLORS.white,
    paddingBottom: 10,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    width: "100%",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  colunaEsquerda: {
    flex: 1,
    alignItems: "flex-start",
  },
<<<<<<< HEAD
  colunaCentral: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
=======

  colunaCentral: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
<<<<<<< HEAD
  logo: {
    width: 180,
    height: 50,
  },
  iconBtn: {
    marginLeft: 15,
  },
=======

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

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  iconePadrao: {
    width: 24,
    height: 24,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  iconeLupa: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  iconeFiltro: {
    width: 16,
    height: 16,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.white,
    fontSize: 12,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  fundoAzul: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
<<<<<<< HEAD
  scrollContent: {
    padding: 15,
  },
  filtroContainer: {
    marginBottom: 15,
  },
=======

  scrollContent: {
    padding: 15,
  },

  filtroContainer: {
    marginBottom: 15,
  },

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  btnFiltro: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  textoFiltro: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginBottom: 15,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  imagemPlaceholder: {
    width: "100%",
    height: 120,
    marginBottom: 20,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  botaoComprar: {
    backgroundColor: COLORS.cyan,
    padding: 12,
    alignItems: "center",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  botaoComprarTexto: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
