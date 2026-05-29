// screens/MeusDadosScreen.js — integrado com back-end (sem acesso ao Dashboard)
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  Image, SafeAreaView, TextInput, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { apiObterPerfil, apiAtualizarPerfil } from '../services/api';
import { useAuth } from '../context/AuthContext';

const COLORS = { primary: '#282b75', white: '#ffffff', background: '#f2f2f2' };

export default function MeusDadosScreen({ navigation }) {
  const { logout, atualizarUsuario } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const carregarPerfil = useCallback(async () => {
    setLoading(true);
    try {
      const resultado = await apiObterPerfil();
      const u = resultado.usuario;
      setNome(u.nome || '');
      setEmail(u.email || '');
      setTelefone(u.telefone || '');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.\n' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarPerfil();
  }, [carregarPerfil]);

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await apiAtualizarPerfil({ nome: nome.trim(), telefone: telefone.trim() });
      atualizarUsuario({ nome: nome.trim(), telefone: telefone.trim() });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setEditando(false);
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    } finally {
      setSalvando(false);
    }
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header branco */}
      <View style={styles.topoBranco}>
        <View style={styles.header}>
          <View style={styles.colunaEsquerda}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../assets/menu.png')} style={styles.iconeMenu} />
            </TouchableOpacity>
          </View>
          <View style={styles.colunaCentral}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.colunaDireita}>
            <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
              <Image source={require('../assets/carrinho.png')} style={styles.iconePadrao} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Faixa azul */}
      <View style={styles.faixaAzul}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Meus Dados</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: '#00aeee', fontWeight: 'bold', fontSize: 13 }}>SAIR</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 12, color: '#666' }}>Carregando dados...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.tituloSecao}>Dados Pessoais</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={[styles.input, !editando && styles.inputReadonly]}
              value={nome}
              editable={editando}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.inputReadonly]}
              value={email}
              editable={false}
            />
            <Text style={styles.hint}>O email não pode ser alterado.</Text>

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={[styles.input, !editando && styles.inputReadonly]}
              value={telefone}
              editable={editando}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />

            {editando ? (
              <View style={styles.rowBotoes}>
                <TouchableOpacity
                  style={[styles.botao, { backgroundColor: '#999', flex: 0.45 }]}
                  onPress={() => { setEditando(false); carregarPerfil(); }}
                  disabled={salvando}
                >
                  <Text style={styles.botaoTexto}>CANCELAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.botao, { flex: 0.45 }, salvando && { opacity: 0.6 }]}
                  onPress={handleSalvar}
                  disabled={salvando}
                >
                  {salvando
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.botaoTexto}>SALVAR</Text>
                  }
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.botao} onPress={() => setEditando(true)}>
                <Text style={styles.botaoTexto}>EDITAR</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  topoBranco: { backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 },
  colunaEsquerda: { flex: 1 },
  colunaCentral: { flex: 2, alignItems: 'center' },
  colunaDireita: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  logo: { width: 150, height: 40 },
  iconeMenu: { width: 24, height: 24 },
  iconePadrao: { width: 22, height: 22 },
  faixaAzul: { height: 60, backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  tituloTela: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  container: { backgroundColor: COLORS.background },
  card: { backgroundColor: COLORS.white, margin: 12, padding: 16, borderRadius: 8, elevation: 2 },
  tituloSecao: { fontSize: 16, fontWeight: '800', marginBottom: 12, color: COLORS.primary },
  label: { fontSize: 13, marginTop: 10, color: '#555' },
  hint: { fontSize: 11, color: '#aaa', marginTop: 2 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 5, color: '#333' },
  inputReadonly: { backgroundColor: '#f5f5f5', color: '#888' },
  rowBotoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  botao: { backgroundColor: COLORS.primary, marginTop: 20, padding: 15, alignItems: 'center', borderRadius: 6 },
  botaoTexto: { color: COLORS.white, fontWeight: '700' },
});
