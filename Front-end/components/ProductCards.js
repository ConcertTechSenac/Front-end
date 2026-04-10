import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const PRODUCTS = [0, 1, 2];

export default function ProductCards({ onPress }) {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        {PRODUCTS.map((i) => (
          <TouchableOpacity key={i} style={styles.card} activeOpacity={0.8} onPress={onPress}>
            <View style={styles.imagePlaceholder} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    aspectRatio: 0.72,
    backgroundColor: COLORS.gray200,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: COLORS.gray200,
  },
});
