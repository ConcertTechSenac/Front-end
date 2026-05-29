import React, { useState } from "react";
import {
  View, Image, StyleSheet, TouchableOpacity,
  Platform, StatusBar, Text, Modal, Switch,
} from "react-native";
import COLORS from "../constants/colors";
import { useCart } from "../context/CartContext";
import { useAccessibility } from "../context/AccessibilityContext";

export default function Header({ navigation, onMenuPress }) {
  const { totalItens } = useCart();
  const { altoContraste, fonteGrande, setAltoContraste, setFonteGrande } = useAccessibility();
  const [painelAberto, setPainelAberto] = useState(false);

  const ativo = altoContraste || fonteGrande;

  return (
    <>
      <View style={[styles.header, altoContraste && styles.headerContraste]}>
        {/* Menu lateral */}
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.8} onPress={onMenuPress}>
          <Image
            source={require("../assets/menu.png")}
            style={[styles.icon, altoContraste && styles.iconContraste]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Logo absolutamente centralizada */}
        <View style={styles.logoAbsoluto} pointerEvents="none">
          <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Ícones direita */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.headerIcon, ativo && styles.headerIconAtivo]}
            activeOpacity={0.8}
            onPress={() => setPainelAberto(true)}
          >
            <Image
              source={require("../assets/acessibilidade.png")}
              style={[styles.icon, ativo && styles.iconAtivo]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIcon}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Carrinho")}
          >
            <Image
              source={require("../assets/carrinho.png")}
              style={[styles.icon, altoContraste && styles.iconContraste]}
              resizeMode="contain"
            />
            {totalItens > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>{totalItens > 9 ? "9+" : totalItens}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Painel de acessibilidade */}
      <Modal visible={painelAberto} transparent animationType="fade" onRequestClose={() => setPainelAberto(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setPainelAberto(false)}>
          <View style={styles.painel} onStartShouldSetResponder={() => true}>
            <View style={styles.painelHeader}>
              <Text style={styles.painelTitulo}>♿  Acessibilidade</Text>
              <TouchableOpacity onPress={() => setPainelAberto(false)}>
                <Text style={styles.painelFechar}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.opcao}>
              <View style={styles.opcaoTextos}>
                <Text style={styles.opcaoLabel}>Alto contraste</Text>
                <Text style={styles.opcaoDesc}>Aumenta o contraste de cores para melhor legibilidade</Text>
              </View>
              <Switch
                value={altoContraste}
                onValueChange={setAltoContraste}
                trackColor={{ false: '#ccc', true: COLORS.primary }}
                thumbColor={altoContraste ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.divisor} />

            <View style={styles.opcao}>
              <View style={styles.opcaoTextos}>
                <Text style={styles.opcaoLabel}>Fonte maior</Text>
                <Text style={styles.opcaoDesc}>Aumenta o tamanho do texto em toda a loja</Text>
              </View>
              <Switch
                value={fonteGrande}
                onValueChange={setFonteGrande}
                trackColor={{ false: '#ccc', true: COLORS.primary }}
                thumbColor={fonteGrande ? '#fff' : '#f4f3f4'}
              />
            </View>

            {(altoContraste || fonteGrande) && (
              <TouchableOpacity
                style={styles.btnResetar}
                onPress={() => { setAltoContraste(false); setFonteGrande(false); }}
              >
                <Text style={styles.btnResetarTexto}>Redefinir configurações</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 12,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerContraste: {
    backgroundColor: '#000',
    borderBottomColor: '#fff',
  },
  logoAbsoluto: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: { width: 130, height: 48 },
  headerIcon: { padding: 6, position: "relative" },
  headerIconAtivo: {
    backgroundColor: COLORS.primary + '18',
    borderRadius: 20,
  },
  headerRight: { flexDirection: "row", alignItems: "center" },
  icon: { width: 24, height: 24 },
  iconContraste: { tintColor: '#fff' },
  iconAtivo: { tintColor: COLORS.primary },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#E53935",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeTexto: { color: COLORS.white, fontSize: 10, fontWeight: "800" },

  /* Painel */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 56 : 80,
    paddingHorizontal: 16,
  },
  painel: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },
  painelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  painelTitulo: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  painelFechar: { fontSize: 18, color: '#999', fontWeight: '600' },
  opcao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  opcaoTextos: { flex: 1, marginRight: 12 },
  opcaoLabel: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  opcaoDesc: { fontSize: 12, color: '#777', marginTop: 2 },
  divisor: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  btnResetar: {
    marginTop: 18,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnResetarTexto: { fontSize: 13, color: '#888', fontWeight: '600' },
});
