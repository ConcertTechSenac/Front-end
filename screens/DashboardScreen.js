// screens/DashboardScreen.js — Dashboard consumindo dados reais do banco
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView, ActivityIndicator, Alert,
  RefreshControl, FlatList,
} from 'react-native';
import { apiListarUsuarios, apiDeletarUsuario } from '../services/api';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  darkBlue: '#282b75',
  cyan: '#00aeee',
  white: '#ffffff',
  green: '#27ae60',
  red: '#e74c3c',
  yellow: '#f39c12',
  background: '#f0f2f8',
  card: '#ffffff',
  text: '#2c3e50',
  textLight: '#7f8c8d',
};

// ─── Componente de Card de Estatística ───────────────────────────────────────
function StatCard({ titulo, valor, cor, icone }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: cor }]}>
      <Text style={styles.statIcone}>{icone}</Text>
      <Text style={[styles.statValor, { color: cor }]}>{valor}</Text>
      <Text style={styles.statTitulo}>{titulo}</Text>
    </View>
  );
}

// ─── Componente de Item de Usuário ───────────────────────────────────────────
function UsuarioItem({ usuario, onDeletar }) {
  const iniciais = usuario.nome
    ? usuario.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '??';

  const dataFormatada = usuario.data_criacao
    ? new Date(usuario.data_criacao).toLocaleDateString('pt-BR')
    : 'N/A';

  const verificado = usuario.email_verificado === 1 || usuario.email_verificado === true;

  return (
    <View style={styles.usuarioCard}>
      <View style={styles.usuarioAvatar}>
        <Text style={styles.usuarioAvatarTexto}>{iniciais}</Text>
      </View>
      <View style={styles.usuarioInfo}>
        <Text style={styles.usuarioNome} numberOfLines={1}>{usuario.nome}</Text>
        <Text style={styles.usuarioEmail} numberOfLines={1}>{usuario.email}</Text>
        <View style={styles.usuarioMeta}>
          <View style={[styles.badge, { backgroundColor: verificado ? COLORS.green : COLORS.yellow }]}>
            <Text style={styles.badgeTexto}>{verificado ? '✓ Verificado' : '⏳ Pendente'}</Text>
          </View>
          <Text style={styles.usuarioData}>Desde {dataFormatada}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnDeletar} onPress={() => onDeletar(usuario)}>
        <Text style={styles.btnDeletarTexto}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────
export default function DashboardScreen({ navigation }) {
  const { usuario: usuarioLogado, logout } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ── Métricas calculadas a partir dos dados reais ──
  const totalUsuarios = usuarios.length;
  const verificados = usuarios.filter(u => u.email_verificado === 1 || u.email_verificado === true).length;
  const pendentes = totalUsuarios - verificados;
  const taxaVerificacao = totalUsuarios > 0 ? Math.round((verificados / totalUsuarios) * 100) : 0;

  // Últimos 30 dias
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  const novosUltimoMes = usuarios.filter(u => {
    if (!u.data_criacao) return false;
    return new Date(u.data_criacao) >= trintaDiasAtras;
  }).length;

  const carregarUsuarios = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const resultado = await apiListarUsuarios();
      setUsuarios(resultado.usuarios || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários.\n' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const handleDeletar = (usuarioAlvo) => {
    // Impede deletar a si mesmo
    if (String(usuarioAlvo.id) === String(usuarioLogado?.id)) {
      Alert.alert('Atenção', 'Você não pode deletar sua própria conta por aqui.');
      return;
    }
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir permanentemente o usuário:\n\n${usuarioAlvo.nome}\n${usuarioAlvo.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiDeletarUsuario(usuarioAlvo.id);
              Alert.alert('Sucesso', 'Usuário deletado.');
              carregarUsuarios();
            } catch (error) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair', style: 'destructive', onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      },
    ]);
  };

  const renderHeader = () => (
    <>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSaudacao}>Olá, {usuarioLogado?.nome?.split(' ')[0] || 'Admin'} 👋</Text>
          <Text style={styles.headerSubtitulo}>Painel de Controle</Text>
        </View>
        <TouchableOpacity style={styles.btnSair} onPress={handleLogout}>
          <Text style={styles.btnSairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* ── Cards de Estatísticas ── */}
      <Text style={styles.secaoTitulo}>Resumo Geral</Text>
      <View style={styles.statsGrid}>
        <StatCard titulo="Total de Usuários" valor={totalUsuarios} cor={COLORS.darkBlue} icone="👥" />
        <StatCard titulo="Verificados" valor={verificados} cor={COLORS.green} icone="✅" />
        <StatCard titulo="Pendentes" valor={pendentes} cor={COLORS.yellow} icone="⏳" />
        <StatCard titulo="Novos (30 dias)" valor={novosUltimoMes} cor={COLORS.cyan} icone="🆕" />
      </View>

      {/* ── Barra de progresso de verificação ── */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitulo}>Taxa de Verificação de E-mail</Text>
          <Text style={[styles.progressPct, { color: taxaVerificacao >= 70 ? COLORS.green : COLORS.yellow }]}>
            {taxaVerificacao}%
          </Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, {
            width: `${taxaVerificacao}%`,
            backgroundColor: taxaVerificacao >= 70 ? COLORS.green : COLORS.yellow,
          }]} />
        </View>
        <Text style={styles.progressSub}>{verificados} de {totalUsuarios} usuários confirmaram o e-mail</Text>
      </View>

      {/* ── Título da lista ── */}
      <View style={styles.listaTitulo}>
        <Text style={styles.secaoTitulo}>Todos os Usuários</Text>
        <TouchableOpacity onPress={() => carregarUsuarios(true)}>
          <Text style={styles.btnAtualizar}>↻ Atualizar</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.darkBlue} />
        <Text style={{ marginTop: 16, color: COLORS.textLight }}>Carregando dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBlue} />

      {/* Faixa azul de topo */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.topBarVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitulo}>Dashboard</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UsuarioItem usuario={item} onDeletar={handleDeletar} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioIcone}>📭</Text>
            <Text style={styles.vazioTexto}>Nenhum usuário encontrado.</Text>
          </View>
        }
        contentContainerStyle={styles.listaPadding}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => carregarUsuarios(true)} colors={[COLORS.darkBlue]} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Top Bar ──
  topBar: {
    height: 56,
    backgroundColor: COLORS.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  topBarVoltar: { color: COLORS.cyan, fontSize: 15, fontWeight: 'bold' },
  topBarTitulo: { color: COLORS.white, fontSize: 18, fontWeight: '700' },

  // ── Header do Dashboard ──
  header: {
    backgroundColor: COLORS.darkBlue,
    padding: 20,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerSaudacao: { color: COLORS.white, fontSize: 20, fontWeight: '800' },
  headerSubtitulo: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
  btnSair: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  btnSairTexto: { color: COLORS.white, fontWeight: '600', fontSize: 13 },

  // ── Seções ──
  secaoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 4,
  },

  // ── Stats Grid ──
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  statCard: {
    width: '46%',
    backgroundColor: COLORS.card,
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statIcone: { fontSize: 22, marginBottom: 8 },
  statValor: { fontSize: 30, fontWeight: '900' },
  statTitulo: { fontSize: 12, color: COLORS.textLight, marginTop: 4, fontWeight: '500' },

  // ── Barra de Progresso ──
  progressCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressTitulo: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  progressPct: { fontSize: 22, fontWeight: '900' },
  progressBg: { height: 10, backgroundColor: '#ecf0f1', borderRadius: 5 },
  progressFill: { height: 10, borderRadius: 5 },
  progressSub: { fontSize: 12, color: COLORS.textLight, marginTop: 8 },

  // ── Lista ──
  listaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  btnAtualizar: { color: COLORS.cyan, fontWeight: '700', marginRight: 16, fontSize: 14 },
  listaPadding: { paddingBottom: 30 },

  // ── Card de Usuário ──
  usuarioCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  usuarioAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  usuarioAvatarTexto: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
  usuarioInfo: { flex: 1 },
  usuarioNome: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  usuarioEmail: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  usuarioMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeTexto: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  usuarioData: { fontSize: 11, color: COLORS.textLight },
  btnDeletar: { padding: 8 },
  btnDeletarTexto: { fontSize: 18 },

  // ── Vazio ──
  vazio: { alignItems: 'center', paddingVertical: 40 },
  vazioIcone: { fontSize: 48, marginBottom: 12 },
  vazioTexto: { color: COLORS.textLight, fontSize: 16 },
});
