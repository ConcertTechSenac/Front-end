import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, Dimensions,
  TouchableOpacity, Image,
} from 'react-native';
import COLORS from '../constants/colors';
import { useProducts } from '../context/ProductContext';
import { fonteImagem } from '../data/produtos';

const { width } = Dimensions.get('window');

const SLIDE_COLORS = [
  { bg: '#1A2DA8', accent: '#00aeee' },
  { bg: '#1B3A2D', accent: '#4CAF50' },
  { bg: '#4A148C', accent: '#CE93D8' },
  { bg: '#B71C1C', accent: '#FF8A80' },
  { bg: '#004D40', accent: '#00BCD4' },
  { bg: '#37474F', accent: '#90A4AE' },
];

function formatPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function AdCarousel({ navigation }) {
  const { produtos } = useProducts();
  const [active, setActive] = useState(0);
  const flatRef = useRef(null);
  const timerRef = useRef(null);

  // Produtos com desconto
  const emPromocao = produtos.filter((p) => p.precoOriginal > p.preco);

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setActive(idx);
  };

  // Auto-scroll a cada 4 segundos
  useEffect(() => {
    if (emPromocao.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % emPromocao.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [emPromocao.length]);

  if (emPromocao.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatRef}
        data={emPromocao}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => String(item.id)}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        renderItem={({ item, index }) => {
          const desconto = Math.round((1 - item.preco / item.precoOriginal) * 100);
          const palette = SLIDE_COLORS[index % SLIDE_COLORS.length];

          return (
            <TouchableOpacity
              style={[styles.slide, { backgroundColor: palette.bg }]}
              activeOpacity={0.92}
              onPress={() => navigation?.navigate('Produto', { produtoId: item.id })}
            >
              {/* Texto à esquerda */}
              <View style={styles.slideTexto}>
                <View style={[styles.badgeDesconto, { backgroundColor: palette.accent }]}>
                  <Text style={styles.badgeTexto}>-{desconto}% OFF</Text>
                </View>
                <Text style={styles.slideNome} numberOfLines={2}>{item.nome}</Text>
                {item.precoOriginal > item.preco && (
                  <Text style={styles.slidePrecoOriginal}>{formatPreco(item.precoOriginal)}</Text>
                )}
                <Text style={[styles.slidePreco, { color: palette.accent }]}>
                  {formatPreco(item.preco)}
                </Text>
                <View style={[styles.btnVer, { borderColor: palette.accent }]}>
                  <Text style={[styles.btnVerTexto, { color: palette.accent }]}>Ver oferta →</Text>
                </View>
              </View>

              {/* Imagem à direita */}
              <View style={styles.slideImagem}>
                <Image
                  source={fonteImagem(item.imagem)}
                  style={styles.foto}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Indicadores */}
      <View style={styles.dotsRow}>
        {emPromocao.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              flatRef.current?.scrollToIndex({ index: i, animated: true });
              setActive(i);
            }}
          >
            <View style={[styles.dot, i === active && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  slide: {
    width,
    height: 170,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  slideTexto: {
    flex: 1,
    paddingRight: 8,
  },
  badgeDesconto: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeTexto: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  slideNome: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 6,
  },
  slidePrecoOriginal: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  slidePreco: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  btnVer: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  btnVerTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  slideImagem: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.gray200,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 20,
    borderRadius: 4,
  },
});
