// components/AdminMenuLateral.js
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView,
} from 'react-native';

const COLORS = { darkBlue: '#282b75', cyan: '#00aeee', white: '#ffffff', background: '#f0f2f8' };

export default function AdminMenuLateral({ navigation, onClose, telaAtiva }) {

  const MenuItem = ({ icone, label, tela }) => {
    const ativa = telaAtiva === tela;
    return (
      <TouchableOpacity
        style={[styles.menuItem, ativa && styles.menuItemAtivo]}
        onPress={() => {
          onClose();
          navigation.navigate(tela);
        }}
      >
        <Text style={styles.menuIcone}>{icone}</Text>
        <Text style={[styles.menuLabel, ativa && styles.menuLabelAtivo]}>{label}</Text>
        {ativa && <View style={styles.indicador} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerSubtitulo}>Painel Admin</Text>
      </View>

      {/* Itens do menu */}
      <View style={styles.menuLista}>
        <Text style={styles.secaoLabel}>NAVEGAÇÃO</Text>

        <MenuItem
          icone="📊"
          label="Dashboard"
          tela="Dashboard"
        />
        <MenuItem
          icone="📦"
          label="Gerenciar Produtos"
          tela="AdminProdutos"
        />
      </View>

      {/* Rodapé */}
      <TouchableOpacity
        style={styles.btnSair}
        onPress={() => {
          onClose();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }}
      >
        <Text style={styles.btnSairIcone}>🚪</Text>
        <Text style={styles.btnSairTexto}>Sair do painel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  logo: {
    width: 140,
    height: 45,
    marginBottom: 8,
  },
  headerSubtitulo: {
    color: COLORS.cyan,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // ── Menu ──
  menuLista: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  secaoLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginLeft: 12,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
    position: 'relative',
  },
  menuItemAtivo: {
    backgroundColor: 'rgba(0,174,238,0.15)',
  },
  menuIcone: {
    fontSize: 20,
    marginRight: 14,
  },
  menuLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  menuLabelAtivo: {
    color: COLORS.cyan,
  },
  indicador: {
    width: 4,
    height: '100%',
    backgroundColor: COLORS.cyan,
    borderRadius: 2,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },

  // ── Botão sair ──
  btnSair: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  btnSairIcone: {
    fontSize: 18,
    marginRight: 12,
  },
  btnSairTexto: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
});
