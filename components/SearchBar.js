import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import SearchIcon from './icons/SearchIcon';
import { useAccessibility } from '../context/AccessibilityContext';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { altoContraste, fonteGrande } = useAccessibility();

  return (
    <View style={[styles.container, altoContraste && styles.containerContraste]}>
      <View style={[styles.bar, altoContraste && styles.barContraste]}>
        <SearchIcon />
        <TextInput
          style={[styles.input, fonteGrande && styles.inputGrande]}
          placeholder="Busque no HARD!"
          placeholderTextColor={altoContraste ? '#aaa' : COLORS.gray400}
          value={query}
          onChangeText={setQuery}
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
  inputGrande: {
    fontSize: 17,
  },
});
