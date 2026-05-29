import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { CATEGORIAS, fonteImagem } from '../data/produtos';
import { useProducts } from '../context/ProductContext';

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
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  star: { fontSize: 12 },
  nota: { fontSize: 11, color: COLORS.gray600, marginLeft: 4 },
});

export default function CategoriaScreen({ route, navigation }) {
  const categoriaInicial = route.params?.categoria ?? null;
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(categoriaInicial);
  const { produtos, getProdutosByCategoria } = useProducts();

  const listaProdutos = categoriaSelecionada
    ? getProdutosByCategoria(categoriaSelecionada)
    : produtos;

  const renderFiltros = () => (
    <View style={styles.filtrosContainer}>
      <TouchableOpacity
        style={[styles.filtroBotao, !categoriaSelecionada && styles.filtroBotaoAtivo]}
        onPress={() => setCategoriaSelecionada(null)}
        activeOpacity={0.75}
      >
        <Text style={[styles.filtroTexto, !categoriaSelecionada && styles.filtroTextoAtivo]}>
          Todos
        </Text>
      </TouchableOpacity>
      {CATEGORIAS.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={[
            styles.filtroBotao,
            categoriaSelecionada === cat.nome && styles.filtroBotaoAtivo,
          ]}
          onPress={() => setCategoriaSelecionada(cat.nome)}
          activeOpacity={0.75}
        >
          <Text
            style={[
              styles.filtroTexto,
              categoriaSelecionada === cat.nome && styles.filtroTextoAtivo,
            ]}
          >
            {cat.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderProduto = ({ item }) => {
    const desconto =
      item.precoOriginal > item.preco
        ? Math.round((1 - item.preco / item.precoOriginal) * 100)
        : 0;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Produto', { produtoId: item.id })}
      >
        <View style={styles.imagemContainer}>
          <Image
            source={fonteImagem(item.imagem)}
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
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>{item.categoria}</Text>
          </View>
          <Text style={styles.nome} numberOfLines={2}>
            {item.nome}
          </Text>
          <Estrelas avaliacao={item.avaliacao} />
          {item.precoOriginal > item.preco && (
            <Text style={styles.precoOriginal}>{formatPreco(item.precoOriginal)}</Text>
          )}
          <Text style={styles.preco}>{formatPreco(item.preco)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.setaVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>
          {categoriaSelecionada ?? 'Todos os Produtos'}
        </Text>
        <TouchableOpacity
          style={styles.btnCarrinho}
          onPress={() => navigation.navigate('Carrinho')}
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/carrinho.png')}
            style={styles.iconeCarrinho}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaProdutos}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.colunaWrapper}
        contentContainerStyle={styles.listaContent}
        ListHeaderComponent={
          <View>
            {renderFiltros()}
            <Text style={styles.totalProdutos}>
              {listaProdutos.length}{' '}
              {listaProdutos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </Text>
          </View>
        }
        renderItem={renderProduto}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhum produto nesta categoria ainda.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  btnVoltar: { padding: 4, marginRight: 8 },
  setaVoltar: { fontSize: 22, color: COLORS.white, fontWeight: '700' },
  headerTitulo: { flex: 1, fontSize: 17, fontWeight: '700', color: COLORS.white },
  btnCarrinho: { padding: 4 },
  iconeCarrinho: { width: 24, height: 24, tintColor: COLORS.white },
  filtrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filtroBotao: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
  },
  filtroBotaoAtivo: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filtroTexto: { fontSize: 13, fontWeight: '600', color: COLORS.gray600 },
  filtroTextoAtivo: { color: COLORS.white },
  totalProdutos: {
    fontSize: 12,
    color: COLORS.gray400,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listaContent: { paddingBottom: 24 },
  colunaWrapper: { paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imagemContainer: { height: 130, position: 'relative', backgroundColor: COLORS.gray100 },
  imagem: { width: '100%', height: '100%' },
  badgeDesconto: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E53935',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeTexto: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  info: { padding: 10 },
  categoriaTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  categoriaTexto: { fontSize: 10, color: COLORS.primary, fontWeight: '600' },
  nome: { fontSize: 13, fontWeight: '600', color: COLORS.text, lineHeight: 18 },
  precoOriginal: {
    fontSize: 11,
    color: COLORS.gray400,
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  preco: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginTop: 2 },
  vazio: { padding: 40, alignItems: 'center' },
  vazioTexto: { fontSize: 15, color: COLORS.gray400, textAlign: 'center' },
});
