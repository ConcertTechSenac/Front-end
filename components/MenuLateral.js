import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Image, TextInput,
} from 'react-native';

const COLORS = {
  darkBlue: '#282b75',
  cyan: '#00aeee',
  white: '#ffffff',
};

export default function MenuLateral({ onClose, navigation }) {
  const [computadoresAberto, setComputadoresAberto] = useState(false);
  const [notebooksAberto, setNotebooksAberto] = useState(false);
  const [busca, setBusca] = useState('');

  const navegarPara = (tela) => {
    onClose();
    navigation.navigate(tela);
  };

  return (
    <View style={styles.container}>

      {/* Header Vazio e Azul */}
      <View style={styles.header}>
        {/* Conteúdo removido para deixar o espaço totalmente limpo e azul */}
      </View>

      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image source={require('../assets/lupa.png')} style={styles.iconeLupa} resizeMode="contain" />
          <TextInput
            style={styles.searchInput}
            placeholder="Busque no HARD!"
            placeholderTextColor="#a0a0cc"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* GRUPO 1 */}
        <View style={styles.item}>
          <Image source={require('../assets/home.png')} style={styles.iconeMenu} resizeMode="contain" />
          <Text style={[styles.itemTexto, styles.inativo]}>Minha Conta</Text>
        </View>

        <View style={styles.item}>
          <Image source={require('../assets/acessibilidade.png')} style={styles.iconeMenu} resizeMode="contain" />
          <Text style={[styles.itemTexto, styles.inativo]}>Acessibilidade</Text>
        </View>

        <View style={styles.item}>
          <Image source={require('../assets/computador.png')} style={styles.iconeMenu} resizeMode="contain" />
          <Text style={[styles.itemTexto, styles.inativo]}>Monte seu PC</Text>
        </View>

        {/* LINHA SEPARADORA */}
        <View style={styles.separador} />

        {/* GRUPO 2 */}
        <TouchableOpacity style={styles.item} onPress={() => setComputadoresAberto(!computadoresAberto)}>
          <Image source={require('../assets/computador.png')} style={styles.iconeMenu} resizeMode="contain" />
          <Text style={styles.itemTextoBold}>Computadores:</Text>
          <Text style={styles.seta}>{computadoresAberto ? ' ∧' : ' ∨'}</Text>
        </TouchableOpacity>
        {computadoresAberto && (
          <View style={styles.submenu}>
            <View style={styles.subItem}><Text style={[styles.subItemTexto, styles.inativo]}>PCs Gamer</Text></View>
            <View style={styles.subItem}><Text style={[styles.subItemTexto, styles.inativo]}>PCs para Uso Diário</Text></View>
            <View style={styles.subItem}><Text style={[styles.subItemTexto, styles.inativo]}>PCs de Alta Performance</Text></View>
          </View>
        )}

        <TouchableOpacity style={styles.item} onPress={() => setNotebooksAberto(!notebooksAberto)}>
          <Image source={require('../assets/notebook.png')} style={[styles.iconeMenu, { tintColor: undefined }]} resizeMode="contain" />
          <Text style={styles.itemTextoBold}>Notebooks:</Text>
          <Text style={styles.seta}>{notebooksAberto ? ' ∧' : ' ∨'}</Text>
        </TouchableOpacity>
        {notebooksAberto && (
          <View style={styles.submenu}>
            <View style={styles.subItem}><Text style={[styles.subItemTexto, styles.inativo]}>Notebooks Gamer</Text></View>
            <View style={styles.subItem}><Text style={[styles.subItemTexto, styles.inativo]}>Notebooks para Uso Diário</Text></View>
            <View style={styles.subItem}><Text style={[styles.subItemTexto, styles.inativo]}>Notebooks de Alta Performance</Text></View>
          </View>
        )}

        <TouchableOpacity style={styles.item} onPress={() => navegarPara('MaisVendidos')}>
          <Image source={require('../assets/sacola.png')} style={styles.iconeMenu} resizeMode="contain" />
          <Text style={styles.itemTexto}>Mais vendidos</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBlue },
  
  // === ESTILO DO HEADER ATUALIZADO ===
  header: { 
    height: 60, // Adicionado para manter a altura do topo, já que não há mais conteúdo dentro
    backgroundColor: COLORS.darkBlue 
  },
  
  logo: { width: 110, height: 36 },
  iconeHeader: { width: 22, height: 22 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 12 },
  searchContainer: { paddingHorizontal: 12, paddingVertical: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.cyan, borderRadius: 6, paddingHorizontal: 10, height: 36 },
  iconeLupa: { width: 14, height: 14, tintColor: COLORS.white },
  searchInput: { flex: 1, marginLeft: 8, color: COLORS.white, fontSize: 13 },
  scroll: { flex: 1 },
  separador: {
    height: 1,
    backgroundColor: COLORS.cyan,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.1)' },
  iconeMenu: { width: 22, height: 22, marginRight: 12, tintColor: COLORS.white },
  itemTexto: { color: COLORS.white, fontSize: 15, fontWeight: '400' },
  itemTextoBold: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  inativo: { opacity: 0.45 },
  seta: { color: COLORS.cyan, fontSize: 14, fontWeight: 'bold' },
  submenu: { backgroundColor: 'rgba(0,0,0,0.15)', paddingLeft: 50 },
  subItem: { paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  subItemTexto: { color: COLORS.white, fontSize: 14, fontWeight: '300' },
});