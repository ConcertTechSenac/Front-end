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
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import COLORS from '../constants/colors';

export default function CadastroScreen({ navigation }) {
  const { width } = useWindowDimensions();
  
  // Estados para os campos de cadastro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const logoWidth = Math.min(width * 0.45, 200);
  const logoHeight = logoWidth * 0.62;
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

<<<<<<< HEAD
      {/* Header */}
      <View style={styles.topoBranco}>
        <View style={styles.header}>
          <View style={styles.colunaEsquerda}>
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

          <Text style={styles.title}>Crie sua conta preenchendo os dados abaixo</Text>

          {/* Campo Nome e Sobrenome */}
          <TextInput
            style={styles.input}
            placeholder="Nome e Sobrenome"
            placeholderTextColor={COLORS.gray400}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            returnKeyType="next"
          />

          {/* Campo Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.gray400}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />

          {/* Campo Senha */}
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={COLORS.gray400}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="next"
          />

          {/* Campo Confirmar Senha */}
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor={COLORS.gray400}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="done"
          />
{/* Botão Confirmar (Azul igual ao Continuar) */}
<TouchableOpacity
  style={styles.primaryButton}
  activeOpacity={0.8}
  onPress={() => {
      console.log("Cadastro realizado!");
      // Agora ele navega para a tela do código de 4 dígitos:
      navigation.navigate('Verificacao'); 
  }}
>
  <Text style={styles.primaryButtonText}>CONFIRMAR</Text>
</TouchableOpacity>
          {/* Link para voltar ao Login se já tiver conta */}
          <TouchableOpacity 
            style={styles.voltarLogin} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.voltarLoginText}>
                Já tem uma conta? <Text style={{fontWeight: '700'}}>Faça login</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Footer mantido conforme solicitado */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('MaisVendidos')}>
            <Text style={styles.footerText}>Departamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Text style={styles.footerText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Text style={styles.footerText}>Minha Conta</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 30, // Reduzi um pouco para caber mais campos na tela
    paddingBottom: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.gray200,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12, // Reduzi o espaçamento entre campos
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary, // Cor azul original
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  voltarLogin: {
    padding: 10,
  },
  voltarLoginText: {
    color: COLORS.text,
    fontSize: 14,
  },
  spacer: {
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerItem: {
    padding: 6,
  },
  footerText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
});
>>>>>>> 4dafc75ab10abab6a281d5ed36e1ed810a1f7660
