import React from "react";
import { View, ScrollView, StatusBar, StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AdCarousel from "../components/AdCarousel";
import ProductCards from "../components/ProductCards";
import Categories from "../components/Categories";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header />
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
    </View>
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
    paddingBottom: 40,
  },
});
