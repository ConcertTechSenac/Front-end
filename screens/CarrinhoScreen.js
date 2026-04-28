import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import COLORS from "../constants/colors";
<<<<<<< HEAD
import BotaoVoltar from "../components/BotaoVoltar";
=======
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660

export default function CarrinhoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header branco */}
      <View style={styles.topoBranco}>
        <View style={styles.header}>
          <View style={styles.colunaEsquerda}>
<<<<<<< HEAD
            <Image
              source={require("../assets/menu.png")}
              style={styles.iconeMenu}
              resizeMode="contain"
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
=======
            <TouchableOpacity activeOpacity={0.8}>
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
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
          <View style={styles.colunaDireita}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
              <Image
                source={require("../assets/acessibilidade.png")}
                style={styles.iconePadrao}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
              <Image
                source={require("../assets/carrinho.png")}
                style={styles.iconePadrao}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

<<<<<<< HEAD
      {/* Faixa azul com botão voltar */}
      <View style={styles.faixaAzul}>
        {/* ✅ BOTÃO VOLTAR */}
        <BotaoVoltar navigation={navigation} />
=======
      {/* Faixa azul */}
      <View style={styles.faixaAzul}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.seta}>←</Text>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/logo.png")}
          style={styles.logoFaixa}
          resizeMode="contain"
        />
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
      </View>

      {/* Conteúdo */}
      <View style={styles.container}>
        <View style={styles.blocoSuperior}>
          <Text style={styles.tituloSecao}>Descrição do Produto</Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.blocoInferior}>
          <Text style={styles.tituloSecao}>Resumo da compra</Text>

          <View style={styles.linhaResumo} />

          <Text style={styles.totalTexto}>Total:</Text>

          <TouchableOpacity style={styles.botaoContinuar} activeOpacity={0.8}>
            <Text style={styles.botaoContinuarTexto}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
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
  topoBranco: {
    backgroundColor: COLORS.white,
  },
=======

  topoBranco: {
    backgroundColor: COLORS.white,
  },

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  colunaEsquerda: {
    flex: 1,
    alignItems: "flex-start",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  colunaCentral: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  colunaDireita: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  iconeMenu: {
    width: 24,
    height: 24,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  iconePadrao: {
    width: 22,
    height: 22,
  },
<<<<<<< HEAD
  iconBtn: {
    marginLeft: 14,
  },
=======

  iconBtn: {
    marginLeft: 14,
  },

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  logo: {
    width: 200,
    height: 42,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  faixaAzul: {
    height: 72,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
<<<<<<< HEAD
    justifyContent: "center",
  },
=======
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "500",
  },

  logoFaixa: {
    width: 80,
    height: 30,
  },

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  blocoSuperior: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  blocoInferior: {
    height: 210,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  divisor: {
    height: 1,
    backgroundColor: "#bdbdbd",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  tituloSecao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  linhaResumo: {
    height: 1,
    backgroundColor: "#9e9e9e",
    marginTop: 18,
    marginBottom: 10,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  totalTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginTop: 8,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  botaoContinuar: {
    backgroundColor: "#2f80ed",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
<<<<<<< HEAD
=======

>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
  botaoContinuarTexto: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
