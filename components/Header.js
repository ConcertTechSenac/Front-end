import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import HamburgerIcon from './icons/HamburgerIcon';
import MonitorIcon from './icons/MonitorIcon';
import AccessibilityIcon from './icons/AccessibilityIcon';
import CartIcon from './icons/CartIcon';

export default function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon}>
        <HamburgerIcon />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <MonitorIcon />
        <Text style={styles.logoText}>
          HARD<Text style={styles.logoAccent}>TECH</Text>
        </Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon}>
          <AccessibilityIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <CartIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerIcon: {
    padding: 6,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 2,
  },
  logoText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  logoAccent: {
    color: COLORS.accent,
  },
});
