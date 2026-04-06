import React, { useState } from "react";
import {
  View, ScrollView, StatusBar, StyleSheet,
  Modal, TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AdCarousel from "../components/AdCarousel";
import ProductCards from "../components/ProductCards";
import Categories from "../components/Categories";
import MenuLateral from "../components/MenuLateral";
import BarraNavegacao from "../components/BarraNavegacao";

export default function HomeScreen({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

        <Header navigation={navigation} onMenuPress={() => setMenuAberto(true)} />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <SearchBar />
          <AdCarousel />
          <ProductCards onPress={() => navigation.navigate('MaisVendidos')} />
          <Categories onPress={() => navigation.navigate('MaisVendidos')} />
        </ScrollView>

        <BarraNavegacao navigation={navigation} telaAtiva="Home" />

        <Modal
          visible={menuAberto}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMenuAberto(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.overlayFundo} onPress={() => setMenuAberto(false)} />
            <View style={styles.menuContainer}>
              <MenuLateral onClose={() => setMenuAberto(false)} navigation={navigation} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  overlayFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: '80%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
});