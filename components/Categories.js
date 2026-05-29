import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import COLORS from '../constants/colors';

const ICON_MAP = {
  computador: require('../assets/computador.png'),
  notebook: require('../assets/notebook.png'),
  sacola: require('../assets/sacola.png'),
  chave: require('../assets/chave.png'),
};

const CATEGORIAS = [
  { id: 1, nome: 'Computadores', icone: 'computador', cor: '#DDEAFF', corBorda: '#1A2DA8' },
  { id: 2, nome: 'Notebooks', icone: 'notebook', cor: '#D6EEFF', corBorda: '#0D47A1' },
  { id: 3, nome: 'Periféricos', icone: 'sacola', cor: '#EDE0FF', corBorda: '#6A0DAD' },
  { id: 4, nome: 'Componentes', icone: 'chave', cor: '#D9F5E5', corBorda: '#1B5E20' },
];

export default function Categories({ navigation }) {
  const handlePress = (categoria) => {
    if (navigation) {
      navigation.navigate('Categoria', { categoria: categoria.nome });
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Ala de CATEGORIAS</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation?.navigate('Categoria', { categoria: null })}>
          <Text style={styles.verTodos}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.item}
            activeOpacity={0.75}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.circle, { backgroundColor: cat.cor, borderColor: cat.corBorda }]}>
              <Image
                source={ICON_MAP[cat.icone]}
                style={styles.icone}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.label} numberOfLines={2}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  verTodos: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  icone: {
    width: 36,
    height: 36,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    maxWidth: 72,
  },
});
