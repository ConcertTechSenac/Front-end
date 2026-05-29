import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, ActivityIndicator, Alert,
  RefreshControl, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiListarUsuarios, apiDeletarUsuario } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const C = {
  dark:       '#282b75',
  cyan:       '#00aeee',
  white:      '#ffffff',
  green:      '#27ae60',
  red:        '#e74c3c',
  yellow:     '#f39c12',
  purple:     '#8e44ad',
  bg:         '#f0f2f8',
  card:       '#ffffff',
  text:       '#2c3e50',
  sub:        '#7f8c8d',
};

// ─── Componentes reutilizáveis ────────────────────────────────────────────────

function StatCard({ titulo, valor, cor, icone }) {
  return (
    <View style={[s.statCard, { borderLeftColor: cor }]}>
      <Text style={s.statIcone}>{icone}</Text>
      <Text style={[s.statValor, { color: cor }]}>{valor}</Text>
      <Text style={s.statTitulo}>{titulo}</Text>
    </View>
  );
}

function Secao({ titulo }) {
  return <Text style={s.secaoTitulo}>{titulo}</Text>;
}

function UsuarioItem({ usuario, onDeletar }) {
  const iniciais = usuario.nome
    ? usuario.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '??';
  const dataFormatada = usuario.data_criacao
    ? new Date(usuario.data_criacao).toLocaleDateString('pt-BR')
    : 'N/A';
  const verificado = usuario.email_verificado === 1 || usuario.email_verificado === true;

  return (
    <View style={s.usuarioCard}>
      <View style={s.avatar}>
        <Text style={s.avatarTxt}>{iniciais}</Text>
      </View>
      <View style={s.usuarioInfo}>
        <Text style={s.usuarioNome} numberOfLines={1}>{usuario.nome}</Text>
        <Text style={s.usuarioEmail} numberOfLines={1}>{usuario.email}</Text>
        <View style={s.usuarioMeta}>
          <View style={[s.badge, { backgroundColor: verificado ? C.green : C.yellow }]}>
            <Text style={s.badgeTxt}>{verificado ? '✓ Verificado' : '⏳ Pendente'}</Text>
          </View>
          <Text style={s.usuarioData}>desde {dataFormatada}</Text>
        </View>
      </View>
      <TouchableOpacity style={s.btnDel} onPress={() => onDeletar(usuario)}>
        <Text style={s.btnDelTxt}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProdutoResumoItem({ produto }) {
  const semEstoque = (produto.estoque ?? 0) === 0;
  const estoqueBaixo = !semEstoque && (produto.estoque ?? 0) < 5;
  return (
    <View style={s.prodCard}>
      <View style={s.prodInfo}>
        <View style={s.prodTagRow}>
          <View style={s.prodTagCat}>
            <Text style={s.prodTagCatTxt}>{produto.categoria}</Text>
          </View>
          {produto.destaque && (
            <View style={s.prodTagHome}>
              <Text style={s.prodTagHomeTxt}>★ Home</Text>
            </View>
          )}
        </View>
        <Text style={s.prodNome} numberOfLines={1}>{produto.nome}</Text>
        <Text style={s.prodPreco}>
          {Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
      <View style={[
        s.estoqueChip,
        semEstoque   ? s.estoqueZero  :
        estoqueBaixo ? s.estoqueBaixo : s.estoqueOk,
      ]}>
        <Text style={s.estoqueChipTxt}>
          {semEstoque   ? 'Sem estoque'           :
           estoqueBaixo ? `⚠ ${produto.estoque} un.` :
                          `${produto.estoque} un.`}
        </Text>
      </View>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function DashboardScreen({ navigation }) {
  const { usuario: usuarioLogado, logout } = useAuth();
  const { produtos }                       = useProducts();

  const [usuarios,   setUsuarios]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [aba,        setAba]        = useState('usuarios'); // 'usuarios' | 'produtos'

  // ── Métricas de usuários ──────────────────────────────────────────────────
  const totalUsuarios   = usuarios.length;
  const verificados     = usuarios.filter(u => u.email_verificado === 1 || u.email_verificado === true).length;
  const pendentes       = totalUsuarios - verificados;
  const taxaVerificacao = totalUsuarios > 0 ? Math.round((verificados / totalUsuarios) * 100) : 0;

  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  const novosUltimoMes = usuarios.filter(u => {
    if (!u.data_criacao) return false;
    return new Date(u.data_criacao) >= trintaDiasAtras;
  }).length;

  // ── Métricas de produtos (dados do ProductContext — refletem o estado atual) ──
  const totalProdutos     = produtos.length;
  const emDestaque        = produtos.filter(p => p.destaque).length;
  const semEstoque        = produtos.filter(p => (p.estoque ?? 0) === 0).length;
  const emEstoque         = totalProdutos - semEstoque;
  const categorias        = [...new Set(produtos.map(p => p.categoria))];
  const valorTotalEstoque = produtos.reduce((sum, p) => sum + p.preco * (p.estoque ?? 0), 0);

  // ── Carregar usuários da API ──────────────────────────────────────────────
  const carregarUsuarios = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await apiListarUsuarios();
      setUsuarios(res.usuarios || []);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários.\n' + err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { carregarUsuarios(); }, [carregarUsuarios]);

  const handleDeletar = (alvo) => {
    if (String(alvo.id) === String(usuarioLogado?.id)) {
      Alert.alert('Atenção', 'Você não pode deletar sua própria conta por aqui.');
      return;
    }
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir permanentemente:\n\n${alvo.nome}\n${alvo.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar', style: 'destructive',
          onPress: async () => {
            try {
              await apiDeletarUsuario(alvo.id);
              Alert.alert('Sucesso', 'Usuário deletado.');
              carregarUsuarios();
            } catch (err) {
              Alert.alert('Erro', err.message);
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: async () => {
        await logout();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }},
    ]);
  };

  // ── Cabeçalho da FlatList ─────────────────────────────────────────────────
  const renderHeader = () => (
    <>
      {/* Saudação */}
      <View style={s.dashHeader}>
        <View>
          <Text style={s.dashSaudacao}>Olá, {usuarioLogado?.nome?.split(' ')[0] || 'Admin'} 👋</Text>
          <Text style={s.dashSub}>Painel de Controle</Text>
        </View>
        <TouchableOpacity style={s.btnSair} onPress={handleLogout}>
          <Text style={s.btnSairTxt}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* ── Stats: Usuários ── */}
      <Secao titulo="👥 Usuários" />
      <View style={s.statsGrid}>
        <StatCard titulo="Total"          valor={totalUsuarios}   cor={C.dark}   icone="👥" />
        <StatCard titulo="Verificados"    valor={verificados}     cor={C.green}  icone="✅" />
        <StatCard titulo="Pendentes"      valor={pendentes}       cor={C.yellow} icone="⏳" />
        <StatCard titulo="Novos (30 dias)" valor={novosUltimoMes} cor={C.cyan}   icone="🆕" />
      </View>

      {/* Barra de verificação */}
      <View style={s.progressCard}>
        <View style={s.progressHead}>
          <Text style={s.progressTitulo}>Taxa de Verificação de E-mail</Text>
          <Text style={[s.progressPct, { color: taxaVerificacao >= 70 ? C.green : C.yellow }]}>
            {taxaVerificacao}%
          </Text>
        </View>
        <View style={s.progressBg}>
          <View style={[s.progressFill, {
            width: `${taxaVerificacao}%`,
            backgroundColor: taxaVerificacao >= 70 ? C.green : C.yellow,
          }]} />
        </View>
        <Text style={s.progressSub}>{verificados} de {totalUsuarios} usuários confirmaram o e-mail</Text>
      </View>

      {/* ── Stats: Produtos ── */}
      <Secao titulo="📦 Produtos (catálogo atual)" />
      <View style={s.statsGrid}>
        <StatCard titulo="Total Produtos"     valor={totalProdutos}  cor={C.dark}   icone="📦" />
        <StatCard titulo="Em Estoque"         valor={emEstoque}      cor={C.green}  icone="✅" />
        <StatCard titulo="Sem Estoque"        valor={semEstoque}     cor={C.red}    icone="⚠️" />
        <StatCard titulo="Destaques (Home)"   valor={emDestaque}     cor={C.cyan}   icone="★" />
      </View>

      {/* Categorias e valor de estoque */}
      <View style={s.prodResumoCard}>
        <View style={s.prodResumoLinha}>
          <Text style={s.prodResumoLabel}>Categorias ativas</Text>
          <Text style={s.prodResumoValor}>{categorias.join(', ') || '—'}</Text>
        </View>
        <View style={[s.prodResumoLinha, { marginBottom: 0 }]}>
          <Text style={s.prodResumoLabel}>Valor total em estoque</Text>
          <Text style={[s.prodResumoValor, { color: C.dark, fontWeight: '800' }]}>
            {valorTotalEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
      </View>

      {/* Abas */}
      <View style={s.abasRow}>
        <TouchableOpacity
          style={[s.aba, aba === 'usuarios' && s.abaAtiva]}
          onPress={() => setAba('usuarios')}
          activeOpacity={0.8}
        >
          <Text style={[s.abaTxt, aba === 'usuarios' && s.abaTxtAtivo]}>
            Usuários ({totalUsuarios})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.aba, aba === 'produtos' && s.abaAtiva]}
          onPress={() => setAba('produtos')}
          activeOpacity={0.8}
        >
          <Text style={[s.abaTxt, aba === 'produtos' && s.abaTxtAtivo]}>
            Produtos ({totalProdutos})
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (loading) {
    return (
      <SafeAreaView style={[s.root, { justifyContent: 'center', alignItems: 'center' }]} edges={['top']}>
        <ActivityIndicator size="large" color={C.dark} />
        <Text style={{ marginTop: 16, color: C.sub }}>Carregando dashboard...</Text>
      </SafeAreaView>
    );
  }

  // ── Dados exibidos conforme a aba selecionada ─────────────────────────────
  const dadosDaLista = aba === 'usuarios' ? usuarios : produtos;

  const renderItem = ({ item }) =>
    aba === 'usuarios'
      ? <UsuarioItem usuario={item} onDeletar={handleDeletar} />
      : <ProdutoResumoItem produto={item} />;

  const keyExtractor = (item) => String(item.id);

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.dark} />

      {/* Top bar */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.topBarVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={s.topBarTitulo}>Dashboard</Text>
        <TouchableOpacity onPress={() => carregarUsuarios(true)} activeOpacity={0.7}>
          <Text style={s.topBarAtualizar}>↻</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dadosDaLista}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={s.vazio}>
            <Text style={s.vazioIcone}>{aba === 'usuarios' ? '📭' : '📦'}</Text>
            <Text style={s.vazioTxt}>
              {aba === 'usuarios' ? 'Nenhum usuário encontrado.' : 'Nenhum produto cadastrado.'}
            </Text>
          </View>
        }
        contentContainerStyle={s.listaPad}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => carregarUsuarios(true)}
            colors={[C.dark]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  topBar: {
    height: 52, backgroundColor: C.dark,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16,
  },
  topBarVoltar:    { color: C.cyan, fontSize: 15, fontWeight: '700' },
  topBarTitulo:    { color: C.white, fontSize: 17, fontWeight: '700' },
  topBarAtualizar: { color: C.cyan, fontSize: 20, fontWeight: '700' },

  dashHeader: {
    backgroundColor: C.dark, padding: 20, paddingTop: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16,
  },
  dashSaudacao: { color: C.white, fontSize: 20, fontWeight: '800' },
  dashSub:      { color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 },
  btnSair: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  btnSairTxt: { color: C.white, fontWeight: '600', fontSize: 13 },

  secaoTitulo: {
    fontSize: 14, fontWeight: '700', color: C.text,
    marginHorizontal: 16, marginBottom: 10, marginTop: 4,
  },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 12, marginBottom: 12,
  },
  statCard: {
    width: '46%', backgroundColor: C.card,
    margin: '2%', padding: 14, borderRadius: 12,
    borderLeftWidth: 4, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4,
  },
  statIcone:  { fontSize: 20, marginBottom: 6 },
  statValor:  { fontSize: 28, fontWeight: '900' },
  statTitulo: { fontSize: 11, color: C.sub, marginTop: 4 },

  progressCard: {
    backgroundColor: C.card, marginHorizontal: 16,
    marginBottom: 16, padding: 16, borderRadius: 12, elevation: 2,
  },
  progressHead: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  progressTitulo: { fontSize: 13, fontWeight: '600', color: C.text },
  progressPct:    { fontSize: 22, fontWeight: '900' },
  progressBg:     { height: 10, backgroundColor: '#ecf0f1', borderRadius: 5 },
  progressFill:   { height: 10, borderRadius: 5 },
  progressSub:    { fontSize: 12, color: C.sub, marginTop: 8 },

  prodResumoCard: {
    backgroundColor: C.card, marginHorizontal: 16,
    marginBottom: 16, padding: 16, borderRadius: 12, elevation: 2,
  },
  prodResumoLinha: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 10,
  },
  prodResumoLabel: { fontSize: 13, color: C.sub, flex: 1 },
  prodResumoValor: { fontSize: 13, color: C.text, fontWeight: '600', textAlign: 'right', flex: 1 },

  // Abas
  abasRow: {
    flexDirection: 'row', marginHorizontal: 16,
    marginBottom: 12, backgroundColor: '#e0e4ef',
    borderRadius: 10, padding: 3,
  },
  aba: {
    flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center',
  },
  abaAtiva: { backgroundColor: C.white, elevation: 2 },
  abaTxt:   { fontSize: 13, fontWeight: '600', color: C.sub },
  abaTxtAtivo: { color: C.dark, fontWeight: '700' },

  listaPad: { paddingBottom: 30 },

  // Card de usuário
  usuarioCard: {
    backgroundColor: C.card, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center',
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 3,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.dark, justifyContent: 'center',
    alignItems: 'center', marginRight: 12,
  },
  avatarTxt:   { color: C.white, fontWeight: '800', fontSize: 15 },
  usuarioInfo: { flex: 1 },
  usuarioNome: { fontSize: 14, fontWeight: '700', color: C.text },
  usuarioEmail:{ fontSize: 12, color: C.sub, marginTop: 1 },
  usuarioMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 8 },
  badge:       { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeTxt:    { color: C.white, fontSize: 10, fontWeight: '700' },
  usuarioData: { fontSize: 11, color: C.sub },
  btnDel:      { padding: 8 },
  btnDelTxt:   { fontSize: 18 },

  // Card de produto no dashboard
  prodCard: {
    backgroundColor: C.card, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 12, padding: 14, flexDirection: 'row',
    alignItems: 'center', elevation: 1,
  },
  prodInfo: { flex: 1 },
  prodTagRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  prodTagCat: {
    backgroundColor: '#E8EAF6', paddingHorizontal: 7,
    paddingVertical: 2, borderRadius: 4,
  },
  prodTagCatTxt: { fontSize: 10, color: C.dark, fontWeight: '700' },
  prodTagHome: {
    backgroundColor: '#E8F5E9', paddingHorizontal: 7,
    paddingVertical: 2, borderRadius: 4,
  },
  prodTagHomeTxt: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
  prodNome:  { fontSize: 14, fontWeight: '700', color: C.text },
  prodPreco: { fontSize: 13, color: C.dark, fontWeight: '600', marginTop: 2 },

  estoqueChip: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 8, alignItems: 'center', minWidth: 70,
  },
  estoqueOk:    { backgroundColor: '#E8F5E9' },
  estoqueBaixo: { backgroundColor: '#FFF3E0' },
  estoqueZero:  { backgroundColor: '#FFEBEE' },
  estoqueChipTxt: { fontSize: 12, fontWeight: '700', color: C.text },

  vazio: { alignItems: 'center', paddingVertical: 40 },
  vazioIcone: { fontSize: 44, marginBottom: 12 },
  vazioTxt:   { color: C.sub, fontSize: 15 },
});
