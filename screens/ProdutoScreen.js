import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { fonteImagem } from '../data/produtos';

function formatPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function Estrelas({ avaliacao, avaliacoes }) {
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
      <Text style={estilosEstrelas.nota}>
        {avaliacao} ({avaliacoes} avaliações)
      </Text>
    </View>
  );
}

const estilosEstrelas = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  star: { fontSize: 18 },
  nota: { fontSize: 13, color: COLORS.gray600, marginLeft: 6 },
});

export default function ProdutoScreen({ route, navigation }) {
  const { produtoId } = route.params;
  const { getProdutoById } = useProducts();
  const { adicionarAoCarrinho } = useCart();
  const produto = getProdutoById(produtoId);

  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  if (!produto) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.setaVoltar}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>Produto</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>Produto não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const desconto =
    produto.precoOriginal > produto.preco
      ? Math.round((1 - produto.preco / produto.precoOriginal) * 100)
      : 0;

  const handleAdicionarCarrinho = () => {
    adicionarAoCarrinho(produto, quantidade);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  const handleComprarAgora = () => {
    adicionarAoCarrinho(produto, quantidade);
    navigation.navigate('Carrinho');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.setaVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo} numberOfLines={1}>
          {produto.nome}
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Imagem */}
        <View style={styles.imagemSection}>
          <Image
            source={fonteImagem(produto.imagem)}
            style={styles.imagemProduto}
            resizeMode="cover"
          />
          {desconto > 0 && (
            <View style={styles.badgeDesconto}>
              <Text style={styles.badgeTexto}>-{desconto}%</Text>
            </View>
          )}
        </View>

        <View style={styles.conteudo}>
          {/* Categoria */}
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>{produto.categoria}</Text>
          </View>

          {/* Nome */}
          <Text style={styles.nomeProduto}>{produto.nome}</Text>

          {/* Estrelas */}
          <Estrelas avaliacao={produto.avaliacao} avaliacoes={produto.avaliacoes} />

          {/* Preço */}
          <View style={styles.precoContainer}>
            {produto.precoOriginal > produto.preco && (
              <Text style={styles.precoOriginal}>De: {formatPreco(produto.precoOriginal)}</Text>
            )}
            <Text style={styles.preco}>{formatPreco(produto.preco)}</Text>
            <Text style={styles.parcelas}>
              ou 12x de {formatPreco(produto.preco / 12)} sem juros
            </Text>
          </View>

          {/* Estoque */}
          {produto.estoque !== undefined && (
            <Text style={[styles.estoque, produto.estoque < 5 && styles.estoqueBaixo]}>
              {produto.estoque > 0
                ? produto.estoque < 5
                  ? `⚠ Restam apenas ${produto.estoque} unidades!`
                  : `✓ Em estoque (${produto.estoque} unidades)`
                : '✗ Sem estoque'}
            </Text>
          )}

          {/* Quantidade */}
          <View style={styles.quantidadeSection}>
            <Text style={styles.quantidadeTitulo}>Quantidade:</Text>
            <View style={styles.quantidadeControle}>
              <TouchableOpacity
                style={[styles.btnQuantidade, quantidade <= 1 && styles.btnQuantidadeDisabled]}
                onPress={() => setQuantidade((q) => Math.max(1, q - 1))}
                activeOpacity={0.7}
                disabled={quantidade <= 1}
              >
                <Text style={styles.btnQuantidadeTexto}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantidadeValor}>{quantidade}</Text>
              <TouchableOpacity
                style={styles.btnQuantidade}
                onPress={() => setQuantidade((q) => q + 1)}
                activeOpacity={0.7}
              >
                <Text style={styles.btnQuantidadeTexto}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.descricaoSection}>
            <Text style={styles.descricaoTitulo}>Descrição do produto</Text>
            <Text style={styles.descricaoTexto}>{produto.descricao}</Text>
          </View>

          {/* Garantias */}
          <View style={styles.garantias}>
            {['Frete grátis acima de R$ 299', 'Garantia de 12 meses', 'Devolução em 30 dias'].map(
              (item) => (
                <View key={item} style={styles.garantiaItem}>
                  <Text style={styles.garantiaIcone}>✓</Text>
                  <Text style={styles.garantiaTexto}>{item}</Text>
                </View>
              )
            )}
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Footer fixo */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btnAdicionar, adicionado && styles.btnAdicionado]}
          onPress={handleAdicionarCarrinho}
          activeOpacity={0.85}
        >
          <Text style={[styles.btnAdicionarTexto, adicionado && styles.btnAdicionadoTexto]}>
            {adicionado ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnComprar} onPress={handleComprarAgora} activeOpacity={0.85}>
          <Text style={styles.btnComprarTexto}>Comprar Agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  btnVoltar: { padding: 4, marginRight: 8 },
  setaVoltar: { fontSize: 22, color: COLORS.white, fontWeight: '700' },
  headerTitulo: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.white },
  btnCarrinho: { padding: 4, marginLeft: 8 },
  iconeCarrinho: { width: 24, height: 24, tintColor: COLORS.white },
  scroll: { flex: 1 },
  imagemSection: { height: 280, position: 'relative', backgroundColor: COLORS.gray100 },
  imagemProduto: { width: '100%', height: '100%' },
  badgeDesconto: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#E53935',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTexto: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
  conteudo: { padding: 20 },
  categoriaTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoriaTexto: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  nomeProduto: { fontSize: 22, fontWeight: '800', color: COLORS.text, lineHeight: 30 },
  precoContainer: {
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
  },
  precoOriginal: {
    fontSize: 13,
    color: COLORS.gray400,
    textDecorationLine: 'line-through',
  },
  preco: { fontSize: 28, fontWeight: '800', color: COLORS.primary, marginTop: 2 },
  parcelas: { fontSize: 13, color: COLORS.gray600, marginTop: 4 },
  estoque: { fontSize: 13, color: '#2E7D32', fontWeight: '600', marginBottom: 16 },
  estoqueBaixo: { color: '#E65100' },
  quantidadeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  quantidadeTitulo: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  quantidadeControle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnQuantidade: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  btnQuantidadeDisabled: { backgroundColor: COLORS.gray200 },
  btnQuantidadeTexto: { fontSize: 20, color: COLORS.white, fontWeight: '700' },
  quantidadeValor: {
    width: 44,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  descricaoSection: { marginBottom: 20 },
  descricaoTitulo: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  descricaoTexto: { fontSize: 14, color: COLORS.gray600, lineHeight: 22 },
  garantias: { backgroundColor: COLORS.background, borderRadius: 12, padding: 14, gap: 8 },
  garantiaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  garantiaIcone: { fontSize: 16, color: '#2E7D32', fontWeight: '700' },
  garantiaTexto: { fontSize: 13, color: COLORS.text },
  footer: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnAdicionar: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdicionado: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  btnAdicionarTexto: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  btnAdicionadoTexto: { color: '#2E7D32' },
  btnComprar: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnComprarTexto: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  erroContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  erroTexto: { fontSize: 16, color: COLORS.gray400 },
});
