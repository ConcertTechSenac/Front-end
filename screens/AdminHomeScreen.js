// screens/AdminHomeScreen.js
// Tela inicial do admin após login — tem o menu lateral para navegar
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  SafeAreaView, Modal, Image,
} from 'react-native';
import AdminMenuLateral from '../components/AdminMenuLateral';

const COLORS = { darkBlue: '#282b75', cyan: '#00aeee', white: '#ffffff', background: '#f0f2f8' };

export default function AdminHomeScreen({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBlue} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.btnMenu}>
          <Text style={styles.btnMenuIcone}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitulo}>Painel Admin</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Conteúdo central */}
      <View style={styles.container}>
        <Text style={styles.bemVindo}>Bem-vindo ao painel! 👋</Text>
        <Text style={styles.instrucao}>
          Abra o menu lateral para navegar entre o Dashboard e o Gerenciamento de Produtos.
        </Text>

        {/* Atalhos rápidos */}
        <TouchableOpacity
          style={styles.atalho}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.atalhoIcone}>📊</Text>
          <View>
            <Text style={styles.atalhoTitulo}>Dashboard</Text>
            <Text style={styles.atalhoSub}>Ver métricas e usuários</Text>
          </View>
          <Text style={styles.atalhoSeta}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.atalho}
          onPress={() => navigation.navigate('AdminProdutos')}
        >
          <Text style={styles.atalhoIcone}>📦</Text>
          <View>
            <Text style={styles.atalhoTitulo}>Gerenciar Produtos</Text>
            <Text style={styles.atalhoSub}>Adicionar, editar e remover</Text>
          </View>
          <Text style={styles.atalhoSeta}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Menu lateral */}
      <Modal
        visible={menuAberto}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuAberto(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <AdminMenuLateral
              navigation={navigation}
              onClose={() => setMenuAberto(false)}
              telaAtiva="AdminHome"
            />
          </View>
          <TouchableOpacity
            style={styles.overlayFundo}
            onPress={() => setMenuAberto(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  // ── Top bar ──
  topBar: {
    height: 56,
    backgroundColor: COLORS.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  btnMenu: { width: 40, alignItems: 'flex-start' },
  btnMenuIcone: { color: COLORS.white, fontSize: 22 },
  topBarTitulo: { color: COLORS.white, fontSize: 18, fontWeight: '700' },

  // ── Conteúdo ──
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  bemVindo: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.darkBlue,
    marginBottom: 8,
    textAlign: 'center',
  },
  instrucao: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },

  // ── Atalhos ──
  atalho: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  atalhoIcone: { fontSize: 28, marginRight: 14 },
  atalhoTitulo: { fontSize: 16, fontWeight: '700', color: COLORS.darkBlue },
  atalhoSub: { fontSize: 12, color: '#7f8c8d', marginTop: 2 },
  atalhoSeta: { fontSize: 24, color: COLORS.cyan, marginLeft: 'auto' },

  // ── Modal ──
  modalOverlay: { flex: 1, flexDirection: 'row' },
  menuContainer: { width: '75%', height: '100%' },
  overlayFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
});
