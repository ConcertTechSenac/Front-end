import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { useCart } from '../context/CartContext';
import { fonteImagem } from '../data/produtos';

function formatPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function ItemCarrinho({ item, onAlterarQuantidade, onRemover }) {
  return (
    <View style={styles.itemCard}>
      <View style={[styles.itemImagem, { backgroundColor: item.cor + '18' }]}>
        {item.imagem ? (
          <Image source={fonteImagem(item.imagem)} style={styles.itemFoto} resizeMode="cover" />
        ) : (
          <Text style={[styles.itemLetra, { color: item.cor }]}>{item.nome[0]}</Text>
        )}
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemNome} numberOfLines={2}>{item.nome}</Text>
        <Text style={styles.itemPrecoUnitario}>{formatPreco(item.preco)} cada</Text>
        <Text style={styles.itemSubtotal}>{formatPreco(item.preco * item.quantidade)}</Text>
      </View>

      <View style={styles.itemControles}>
        <TouchableOpacity
          style={styles.btnQtd}
          onPress={() => onAlterarQuantidade(item.id, item.quantidade - 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.btnQtdTexto}>−</Text>
        </TouchableOpacity>
        <Text style={styles.itemQtd}>{item.quantidade}</Text>
        <TouchableOpacity
          style={styles.btnQtd}
          onPress={() => onAlterarQuantidade(item.id, item.quantidade + 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.btnQtdTexto}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnRemover}
          onPress={() => onRemover(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.btnRemoverTexto}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CarrinhoScreen({ navigation }) {
  const { itens, alterarQuantidade, removerDoCarrinho, limparCarrinho, total, totalItens } = useCart();

  const handleRemover = (id) => {
    Alert.alert('Remover item', 'Deseja remover este item do carrinho?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removerDoCarrinho(id) },
    ]);
  };

  const handleFinalizar = () => {
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.setaVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>
          Meu Carrinho {totalItens > 0 ? `(${totalItens})` : ''}
        </Text>
        <TouchableOpacity
          onPress={() => itens.length > 0 && Alert.alert('Limpar carrinho', 'Deseja remover todos os itens?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Limpar', style: 'destructive', onPress: limparCarrinho },
          ])}
          activeOpacity={0.7}
        >
          <Text style={styles.btnLimpar}>{itens.length > 0 ? 'Limpar' : ''}</Text>
        </TouchableOpacity>
      </View>

      {itens.length === 0 ? (
        /* Carrinho vazio */
        <View style={styles.vazio}>
          <Image source={require('../assets/carrinho.png')} style={styles.vazioIcone} resizeMode="contain" />
          <Text style={styles.vazioTitulo}>Carrinho vazio</Text>
          <Text style={styles.vazioTexto}>Adicione produtos para continuar suas compras.</Text>
          <TouchableOpacity
            style={styles.btnContinuarComprando}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnContinuarTexto}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Lista de itens */}
          <FlatList
            data={itens}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.lista}
            renderItem={({ item }) => (
              <ItemCarrinho
                item={item}
                onAlterarQuantidade={alterarQuantidade}
                onRemover={handleRemover}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separador} />}
          />

          {/* Resumo e finalizar */}
          <View style={styles.resumo}>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Subtotal ({totalItens} {totalItens === 1 ? 'item' : 'itens'})</Text>
              <Text style={styles.resumoValor}>{formatPreco(total)}</Text>
            </View>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Frete</Text>
              <Text style={styles.resumoFrete}>{total >= 299 ? 'Grátis' : formatPreco(29.90)}</Text>
            </View>
            <View style={[styles.resumoLinha, styles.resumoTotal]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValor}>
                {formatPreco(total < 299 ? total + 29.90 : total)}
              </Text>
            </View>
            {total < 299 && (
              <Text style={styles.freteAviso}>
                Faltam {formatPreco(299 - total)} para frete grátis!
              </Text>
            )}
            <TouchableOpacity style={styles.btnFinalizar} onPress={handleFinalizar} activeOpacity={0.85}>
              <Text style={styles.btnFinalizarTexto}>Finalizar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSeguirComprando}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.75}
            >
              <Text style={styles.btnSeguirTexto}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  btnVoltar: {
    padding: 4,
    marginRight: 8,
  },
  setaVoltar: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: '700',
  },
  headerTitulo: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
  },
  btnLimpar: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  /* Vazio */
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  vazioIcone: {
    width: 100,
    height: 100,
    opacity: 0.3,
    marginBottom: 20,
  },
  vazioTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  vazioTexto: {
    fontSize: 14,
    color: COLORS.gray400,
    textAlign: 'center',
    marginBottom: 28,
  },
  btnContinuarComprando: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  btnContinuarTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  /* Lista */
  lista: {
    padding: 16,
    paddingBottom: 8,
  },
  separador: {
    height: 10,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    gap: 10,
    alignItems: 'center',
  },
  itemImagem: {
    width: 72,
    height: 72,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemFoto: {
    width: '100%',
    height: '100%',
  },
  itemLetra: {
    fontSize: 26,
    fontWeight: '800',
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 19,
  },
  itemPrecoUnitario: {
    fontSize: 12,
    color: COLORS.gray400,
    marginTop: 2,
  },
  itemSubtotal: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 4,
  },
  itemControles: {
    alignItems: 'center',
    gap: 6,
  },
  btnQtd: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnQtdTexto: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 22,
  },
  itemQtd: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    minWidth: 28,
    textAlign: 'center',
  },
  btnRemover: {
    marginTop: 4,
  },
  btnRemoverTexto: {
    fontSize: 18,
  },
  /* Resumo */
  resumo: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resumoLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  resumoValor: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  resumoFrete: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  resumoTotal: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  totalValor: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  freteAviso: {
    fontSize: 12,
    color: '#E65100',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  btnFinalizar: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  btnFinalizarTexto: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnSeguirComprando: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  btnSeguirTexto: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
