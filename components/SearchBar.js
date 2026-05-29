import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import SearchIcon from './icons/SearchIcon';
import { useAccessibility } from '../context/AccessibilityContext';

export default function SearchBar({ navigation }) {
  const [query, setQuery] = useState('');
  const { altoContraste, fonteGrande } = useAccessibility();

  const executarBusca = () => {
    const termo = query.trim();
    if (!termo) return;
    navigation?.navigate('Categoria', { busca: termo });
  };

  return (
    <View style={[styles.container, altoContraste && styles.containerContraste]}>
      <View style={[styles.bar, altoContraste && styles.barContraste]}>
        <TouchableOpacity onPress={executarBusca} activeOpacity={0.7}>
          <SearchIcon />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, fonteGrande && styles.inputGrande, altoContraste && styles.inputContraste]}
          placeholder="Busque no HARD!"
          placeholderTextColor={altoContraste ? '#888' : 'rgba(255,255,255,0.65)'}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={executarBusca}
          returnKeyType="search"
          blurOnSubmit={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  containerContraste: {
    backgroundColor: '#000',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  barContraste: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  inputContraste: {
    color: '#000',
  },
  inputGrande: {
    fontSize: 17,
  },
});
