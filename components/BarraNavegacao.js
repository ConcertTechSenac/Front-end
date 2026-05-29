import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = {
  darkBlue: '#282b75',
  white: '#ffffff',
  cyan: '#00aeee',
};

export default function BarraNavegacao({ navigation, telaAtiva }) {
  const itens = [
    { label: 'Home',        tela: 'Home'      },
    { label: 'Minha Conta', tela: 'MeusDados' },
  ];

  return (
    <View style={styles.barra}>
      {itens.map((item) => {
        const ativo = telaAtiva === item.label;
        return (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.tela)}
          >
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>
              {item.label}
            </Text>
            {ativo && <View style={styles.indicador} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  item: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  texto: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
  },
  textoAtivo: {
    color: COLORS.cyan,
    fontWeight: '700',
  },
  indicador: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.cyan,
    marginTop: 3,
  },
});
