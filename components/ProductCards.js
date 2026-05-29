import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import COLORS from '../constants/colors';
import { useProducts } from '../context/ProductContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { fonteImagem } from '../data/produtos';

function formatPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function Estrelas({ avaliacao }) {
  return (
    <View style={estilosEstrelas.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={[estilosEstrelas.star, { color: i <= Math.round(avaliacao) ? '#F5A623' : COLORS.gray200 }]}
        >
          ★
        </Text>
      ))}
      <Text style={estilosEstrelas.nota}>{avaliacao}</Text>
    </View>
  );
}

const estilosEstrelas = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  star: { fontSize: 12 },
  nota: { fontSize: 11, color: COLORS.gray600, marginLeft: 4 },
});

export default function ProductCards({ navigation }) {
  const { getProdutosDestaque } = useProducts();
  const { altoContraste, fonteGrande } = useAccessibility();
  const produtos = getProdutosDestaque();

  if (produtos.length === 0) return null;

  const bg = altoContraste ? '#000' : COLORS.white;
  const cardBg = altoContraste ? '#111' : COLORS.white;
  const textColor = altoContraste ? '#fff' : COLORS.text;
  const primaryColor = altoContraste ? '#00d4ff' : COLORS.primary;
  const fs = (base) => fonteGrande ? base + 3 : base;

  return (
    <View style={[styles.section, { backgroundColor: bg }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: textColor, fontSize: fs(15) }]}>Em Destaque</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation?.navigate('Categoria', { categoria: null })}
        >
          <Text style={[styles.verTodos, { color: primaryColor, fontSize: fs(13) }]}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {produtos.map((produto) => {
          const desconto =
            produto.precoOriginal > produto.preco
              ? Math.round((1 - produto.preco / produto.precoOriginal) * 100)
              : 0;

          return (
            <TouchableOpacity
              key={produto.id}
              style={[styles.card, { backgroundColor: cardBg }]}
              activeOpacity={0.85}
              onPress={() => navigation?.navigate('Produto', { produtoId: produto.id })}
            >
              <View style={styles.imagemContainer}>
                <Image
                  source={fonteImagem(produto.imagem)}
                  style={styles.imagem}
                  resizeMode="cover"
                />
                {desconto > 0 && (
                  <View style={styles.badgeDesconto}>
                    <Text style={styles.badgeTexto}>-{desconto}%</Text>
                  </View>
                )}
              </View>

              <View style={styles.info}>
                <Text style={[styles.nome, { color: textColor, fontSize: fs(13) }]} numberOfLines={2}>
                  {produto.nome}
                </Text>
                <Estrelas avaliacao={produto.avaliacao} />
                {produto.precoOriginal > produto.preco && (
                  <Text style={[styles.precoOriginal, { fontSize: fs(11) }]}>
                    {formatPreco(produto.precoOriginal)}
                  </Text>
                )}
                <Text style={[styles.preco, { color: primaryColor, fontSize: fs(15) }]}>
                  {formatPreco(produto.preco)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  verTodos: {
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imagemContainer: {
    height: 130,
    position: 'relative',
    backgroundColor: COLORS.gray100,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  badgeDesconto: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E53935',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeTexto: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    padding: 10,
  },
  nome: {
    fontWeight: '600',
    lineHeight: 18,
  },
  precoOriginal: {
    color: COLORS.gray400,
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
  preco: {
    fontWeight: '800',
    marginTop: 2,
  },
});
