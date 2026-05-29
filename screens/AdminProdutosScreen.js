import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  Modal, TextInput, Alert, ActivityIndicator, Platform,
  ScrollView, KeyboardAvoidingView, Image, Switch, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../context/ProductContext';
import { CATEGORIAS, fonteImagem } from '../data/produtos';

const C = {
  dark:   '#1A2DA8',
  cyan:   '#00aeee',
  white:  '#ffffff',
  bg:     '#F5F7FF',
  green:  '#2E7D32',
  yellow: '#F57F17',
  red:    '#C62828',
  border: '#DDE3F0',
  text:   '#0D1530',
  sub:    '#5C6580',
};

const CARD_H = 100;

const VAZIO = {
  nome: '', descricao: '', preco: '', precoOriginal: '',
  estoque: '', categoria: 'Computadores', imagem: '',
  avaliacao: '4.5', avaliacoes: '0', destaque: false, cor: '#1A2DA8',
};

// ─────────────────────────────────────────────────────────────────────────────
// Campo reutilizável
// ─────────────────────────────────────────────────────────────────────────────
function Campo({ label, hint, value, onChange, placeholder, teclado, multiline, soLeitura, capitalize }) {
  return (
    <View style={st.campo}>
      <Text style={st.label}>{label}</Text>
      {hint ? <Text style={st.hint}>{hint}</Text> : null}
      <TextInput
        style={[st.input, multiline && st.inputMulti, soLeitura && st.inputRO]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        keyboardType={teclado ?? 'default'}
        multiline={!!multiline}
        numberOfLines={multiline ? 4 : 1}
        editable={!soLeitura}
        autoCapitalize={capitalize ?? 'sentences'}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AdminProdutosScreen({ navigation }) {
  const { produtos, adicionarProduto, editarProduto, removerProduto, toggleDestaque } = useProducts();

  const [visible,  setVisible]  = useState(false);
  const [modo,     setModo]     = useState('adicionar'); // 'adicionar' | 'editar' | 'ver'
  const [atual,    setAtual]    = useState(null);
  const [form,     setForm]     = useState(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [imgErro,  setImgErro]  = useState(false);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ── Abrir modal ────────────────────────────────────────────────────────────

  const openAdd = () => {
    setModo('adicionar'); setForm(VAZIO); setImgErro(false); setAtual(null); setVisible(true);
  };

  const preencherForm = (p) => ({
    nome: p.nome, descricao: p.descricao,
    preco: String(p.preco), precoOriginal: String(p.precoOriginal ?? ''),
    estoque: String(p.estoque ?? ''), categoria: p.categoria,
    imagem: p.imagem, avaliacao: String(p.avaliacao),
    avaliacoes: String(p.avaliacoes), destaque: p.destaque, cor: p.cor ?? '#1A2DA8',
  });

  const openEdit = (p) => {
    setModo('editar'); setImgErro(false); setAtual(p); setForm(preencherForm(p)); setVisible(true);
  };

  const openVer = (p) => {
    setModo('ver'); setAtual(p); setForm(preencherForm(p)); setImgErro(false); setVisible(true);
  };

  const fechar = () => setVisible(false);

  // ── Excluir ────────────────────────────────────────────────────────────────

  const excluir = (p) =>
    Alert.alert('Excluir produto', `Deseja excluir "${p.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removerProduto(p.id) },
    ]);

  // ── Salvar ─────────────────────────────────────────────────────────────────

  const validar = () => {
    if (!form.nome.trim())                        return 'Informe o nome.';
    if (!form.preco || isNaN(Number(form.preco))) return 'Informe um preço válido.';
    if (!form.imagem.trim())                      return 'Informe a URL da imagem.';
    return null;
  };

  const salvar = async () => {
    const err = validar();
    if (err) { Alert.alert('Atenção', err); return; }
    setSalvando(true);
    await new Promise(r => setTimeout(r, 250));
    const dados = {
      nome:          form.nome.trim(),
      nomeShort:     form.nome.trim().split(' ').slice(0, 2).join(' '),
      descricao:     form.descricao.trim(),
      preco:         Number(form.preco),
      precoOriginal: form.precoOriginal ? Number(form.precoOriginal) : Number(form.preco),
      estoque:       form.estoque ? Number(form.estoque) : 0,
      categoria:     form.categoria,
      imagem:        form.imagem.trim(),
      avaliacao:     Number(form.avaliacao) || 4.5,
      avaliacoes:    Number(form.avaliacoes) || 0,
      destaque:      form.destaque,
      cor:           form.cor || '#1A2DA8',
    };
    if (modo === 'adicionar') { adicionarProduto(dados); Alert.alert('Sucesso', 'Produto adicionado!'); }
    else                      { editarProduto(atual.id, dados); Alert.alert('Sucesso', 'Produto atualizado!'); }
    setSalvando(false);
    fechar();
  };

  // ── Card ───────────────────────────────────────────────────────────────────

  const renderCard = ({ item }) => (
    <View style={st.card}>
      {/* Thumbnail — largura e altura numéricas fixas */}
      <View style={st.thumb}>
        <Image source={fonteImagem(item.imagem)} style={st.thumbImg} resizeMode="cover" />
        <TouchableOpacity
          style={[st.star, item.destaque && st.starOn]}
          onPress={() => toggleDestaque(item.id)}
          activeOpacity={0.8}
        >
          <Text style={st.starTxt}>{item.destaque ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      {/* Informações */}
      <View style={st.cardBody}>
        <View style={st.tags}>
          <View style={st.tagCat}><Text style={st.tagCatTxt}>{item.categoria}</Text></View>
          {item.destaque && <View style={st.tagHome}><Text style={st.tagHomeTxt}>Home</Text></View>}
          {item.estoque != null && item.estoque < 5 &&
            <View style={st.tagBaixo}><Text style={st.tagBaixoTxt}>Estoque baixo</Text></View>}
        </View>
        <Text style={st.cardNome} numberOfLines={2}>{item.nome}</Text>
        <Text style={st.cardPreco}>
          {Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
        <Text style={st.cardEst}>Estoque: {item.estoque ?? '—'} un.</Text>
      </View>

      {/* Ações */}
      <View style={st.acoes}>
        <TouchableOpacity style={[st.btn, st.btnV]} onPress={() => openVer(item)}  activeOpacity={0.8}><Text style={st.btnTxt}>👁</Text></TouchableOpacity>
        <TouchableOpacity style={[st.btn, st.btnE]} onPress={() => openEdit(item)} activeOpacity={0.8}><Text style={st.btnTxt}>✏️</Text></TouchableOpacity>
        <TouchableOpacity style={[st.btn, st.btnX]} onPress={() => excluir(item)}  activeOpacity={0.8}><Text style={st.btnTxt}>🗑</Text></TouchableOpacity>
      </View>
    </View>
  );

  // ── Modal ──────────────────────────────────────────────────────────────────

  const soLeitura = modo === 'ver';
  const titulo    = modo === 'adicionar' ? 'Adicionar Produto'
                  : modo === 'editar'    ? 'Editar Produto'
                  :                        'Detalhes do Produto';

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={st.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.dark} />

      {/* Header */}
      <View style={st.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={st.backBtn}>
          <Text style={st.backTxt}>←</Text>
        </TouchableOpacity>
        <View style={st.headerMid}>
          <Text style={st.headerTitle}>Gerenciar Produtos</Text>
          <Text style={st.headerSub}>{produtos.length} produto{produtos.length !== 1 ? 's' : ''}</Text>
        </View>
        <TouchableOpacity style={st.addBtn} onPress={openAdd} activeOpacity={0.8}>
          <Text style={st.addBtnTxt}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={produtos}
        keyExtractor={i => String(i.id)}
        renderItem={renderCard}
        contentContainerStyle={st.lista}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={st.vazio}>
            <Text style={st.vazioTxt}>Nenhum produto ainda.</Text>
            <TouchableOpacity style={st.addBtn} onPress={openAdd} activeOpacity={0.8}>
              <Text style={st.addBtnTxt}>+ Adicionar produto</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      <Modal visible={visible} animationType="slide" transparent onRequestClose={fechar}>
        {/*
          Overlay escura cobre a tela toda.
          O sheet fica na base com height FIXO (não maxHeight) para que
          flex:1 no ScrollView funcione corretamente no React Native.
        */}
        <View style={st.overlay}>
          {/* Toque fora fecha */}
          <TouchableOpacity style={st.overlayTouch} onPress={fechar} activeOpacity={1} />

          {/* Sheet com altura fixa — resolve o colapso do ScrollView */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={st.sheetWrap}
          >
            <View style={st.sheet}>

              {/* Cabeçalho fixo */}
              <View style={st.sheetHead}>
                <Text style={st.sheetTitle}>{titulo}</Text>
                <TouchableOpacity style={st.closeBtn} onPress={fechar} activeOpacity={0.7}>
                  <Text style={st.closeTxt}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Área rolável — flex:1 funciona porque o pai (sheet) tem height fixo */}
              <ScrollView
                style={st.scroll}
                contentContainerStyle={st.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Preview da imagem */}
                <View style={st.imgBox}>
                  {form.imagem && !imgErro ? (
                    <Image
                      source={fonteImagem(form.imagem)}
                      style={st.imgBoxImg}
                      resizeMode="cover"
                      onError={() => setImgErro(true)}
                    />
                  ) : (
                    <View style={st.imgBoxVazio}>
                      <Text style={st.imgBoxVazioTxt}>
                        {imgErro ? '⚠ URL inválida' : 'Prévia da imagem'}
                      </Text>
                    </View>
                  )}
                </View>

                {/* URL */}
                <Campo label="URL da Imagem *" value={form.imagem}
                  onChange={v => { upd('imagem', v); setImgErro(false); }}
                  placeholder="https://..." soLeitura={soLeitura} capitalize="none" />

                {/* Nome */}
                <Campo label="Nome do Produto *" value={form.nome}
                  onChange={v => upd('nome', v)}
                  placeholder="Ex: Notebook Gamer Pro" soLeitura={soLeitura} />

                {/* Preço / Preço original */}
                <View style={st.row2}>
                  <View style={st.col}>
                    <Campo label="Preço (R$) *" value={form.preco}
                      onChange={v => upd('preco', v)}
                      placeholder="0.00" teclado="numeric" soLeitura={soLeitura} />
                  </View>
                  <View style={st.col}>
                    <Campo label="Preço Original (R$)" value={form.precoOriginal}
                      onChange={v => upd('precoOriginal', v)}
                      placeholder="0.00" teclado="numeric" soLeitura={soLeitura}
                      hint="Vazio = sem desconto" />
                  </View>
                </View>

                {/* Estoque / Avaliação */}
                <View style={st.row2}>
                  <View style={st.col}>
                    <Campo label="Estoque (un.)" value={form.estoque}
                      onChange={v => upd('estoque', v)}
                      placeholder="0" teclado="numeric" soLeitura={soLeitura} />
                  </View>
                  <View style={st.col}>
                    <Campo label="Avaliação (0–5)" value={form.avaliacao}
                      onChange={v => upd('avaliacao', v)}
                      placeholder="4.5" teclado="numeric" soLeitura={soLeitura} />
                  </View>
                </View>

                {/* Categoria */}
                <Text style={st.label}>Categoria *</Text>
                <View style={st.catRow}>
                  {CATEGORIAS.map(cat => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[st.catBtn, form.categoria === cat.nome && st.catBtnOn]}
                      onPress={() => !soLeitura && upd('categoria', cat.nome)}
                      activeOpacity={soLeitura ? 1 : 0.75}
                    >
                      <Text style={[st.catBtnTxt, form.categoria === cat.nome && st.catBtnTxtOn]}>
                        {cat.nome}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Descrição */}
                <Campo label="Descrição" value={form.descricao}
                  onChange={v => upd('descricao', v)}
                  placeholder="Especificações do produto..." multiline soLeitura={soLeitura} />

                {/* Toggle destaque */}
                <View style={st.toggleRow}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <Text style={st.label}>Destaque na página inicial</Text>
                    <Text style={st.hint}>Aparece na seção "Em Destaque" da home</Text>
                  </View>
                  <Switch
                    value={form.destaque}
                    onValueChange={v => !soLeitura && upd('destaque', v)}
                    trackColor={{ false: '#ccc', true: C.dark + '90' }}
                    thumbColor={form.destaque ? C.dark : '#eee'}
                    disabled={soLeitura}
                  />
                </View>
              </ScrollView>

              {/* Footer fixo — fora do ScrollView, sempre visível */}
              <View style={st.sheetFoot}>
                <TouchableOpacity style={st.cancelBtn} onPress={fechar} activeOpacity={0.75}>
                  <Text style={st.cancelTxt}>{soLeitura ? 'Fechar' : 'Cancelar'}</Text>
                </TouchableOpacity>

                {soLeitura ? (
                  <TouchableOpacity
                    style={st.saveBtn}
                    onPress={() => { fechar(); setTimeout(() => openEdit(atual), 350); }}
                    activeOpacity={0.85}
                  >
                    <Text style={st.saveTxt}>Editar produto</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[st.saveBtn, salvando && st.saveBtnBusy]}
                    onPress={salvar}
                    disabled={salvando}
                    activeOpacity={0.85}
                  >
                    {salvando
                      ? <ActivityIndicator color="#fff" size="small" />
                      : <Text style={st.saveTxt}>{modo === 'adicionar' ? 'Adicionar' : 'Salvar'}</Text>}
                  </TouchableOpacity>
                )}
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estilos
// ─────────────────────────────────────────────────────────────────────────────
const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // ── Header ──
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.dark, paddingHorizontal: 14, paddingVertical: 12,
  },
  backBtn: { paddingRight: 12, paddingVertical: 4 },
  backTxt: { fontSize: 22, color: C.white, fontWeight: '700' },
  headerMid: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: C.white },
  headerSub: { fontSize: 11, color: C.cyan, marginTop: 1 },
  addBtn: {
    backgroundColor: C.green, paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 10,
  },
  addBtnTxt: { color: C.white, fontWeight: '700', fontSize: 13 },

  // ── Lista ──
  lista: { padding: 14, paddingBottom: 30 },
  vazio: { alignItems: 'center', marginTop: 60, gap: 16 },
  vazioTxt: { fontSize: 15, color: C.sub },

  // ── Card ──
  card: {
    flexDirection: 'row', backgroundColor: C.white,
    borderRadius: 14, overflow: 'hidden', minHeight: CARD_H,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4,
  },
  // Thumbnail com dimensões NUMÉRICAS FIXAS — evita bug do height:'100%'
  thumb: { width: 90, height: CARD_H, backgroundColor: '#eee', position: 'relative' },
  thumbImg: { width: 90, height: CARD_H },
  star: {
    position: 'absolute', top: 6, left: 6, width: 26, height: 26,
    borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  starOn: { backgroundColor: '#FFF176' },
  starTxt: { fontSize: 14 },

  cardBody: { flex: 1, paddingHorizontal: 10, paddingVertical: 8, justifyContent: 'center' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 4 },
  tagCat:   { backgroundColor: C.dark + '18', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  tagHome:  { backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  tagBaixo: { backgroundColor: '#FFF3E0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  tagCatTxt:   { fontSize: 9, color: C.dark,   fontWeight: '700' },
  tagHomeTxt:  { fontSize: 9, color: C.green,  fontWeight: '700' },
  tagBaixoTxt: { fontSize: 9, color: C.yellow, fontWeight: '700' },
  cardNome:  { fontSize: 13, fontWeight: '700', color: C.text, lineHeight: 18 },
  cardPreco: { fontSize: 14, fontWeight: '800', color: C.dark, marginTop: 3 },
  cardEst:   { fontSize: 11, color: C.sub, marginTop: 1 },

  acoes: {
    width: 44, paddingVertical: 8, alignItems: 'center',
    justifyContent: 'space-around',
    borderLeftWidth: 1, borderLeftColor: C.border,
  },
  btn:  { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnV: { backgroundColor: '#EEF2FF' },
  btnE: { backgroundColor: '#FFF8E1' },
  btnX: { backgroundColor: '#FFEBEE' },
  btnTxt: { fontSize: 14 },

  // ── Modal ──
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  overlayTouch: { flex: 1 },

  // sheetWrap envolve o KAV — não define altura aqui
  sheetWrap: { width: '100%' },

  // sheet tem HEIGHT FIXO para que flex:1 no ScrollView funcione corretamente
  sheet: {
    height: 620,            // altura fixa garante que o ScrollView tenha espaço real
    backgroundColor: C.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },

  sheetHead: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  sheetTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: C.dark },
  closeBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center',
  },
  closeTxt: { fontSize: 14, color: C.dark, fontWeight: '700' },

  // ScrollView com flex:1 — funciona porque o pai (sheet) tem height fixo
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 12 },

  // Prévia de imagem
  imgBox: {
    height: 150, borderRadius: 12, overflow: 'hidden',
    backgroundColor: '#EEF2FF', marginBottom: 16,
  },
  imgBoxImg: { width: '100%', height: '100%' },
  imgBoxVazio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imgBoxVazioTxt: { color: '#9AA3B8', fontSize: 13 },

  // Campos
  campo: { marginBottom: 14 },
  label: {
    fontSize: 11, fontWeight: '700', color: C.sub,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5,
  },
  hint: { fontSize: 11, color: '#aaa', marginBottom: 4 },
  input: {
    borderWidth: 1.5, borderColor: C.border, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 14, color: C.text, backgroundColor: '#FAFBFF',
  },
  inputMulti: { height: 90, paddingTop: 10 },
  inputRO: { backgroundColor: '#F0F2F8', color: C.sub },

  row2: { flexDirection: 'row', gap: 10 },
  col:  { flex: 1 },

  // Categorias
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  catBtn: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8,
    borderWidth: 1.5, borderColor: C.border, backgroundColor: C.white,
  },
  catBtnOn:    { backgroundColor: C.dark, borderColor: C.dark },
  catBtnTxt:   { fontSize: 13, fontWeight: '600', color: C.sub },
  catBtnTxtOn: { color: C.white },

  // Toggle destaque
  toggleRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FF', borderRadius: 12,
    padding: 14, marginBottom: 8,
  },

  // Footer do sheet
  sheetFoot: {
    flexDirection: 'row', gap: 10,
    paddingHorizontal: 20, paddingVertical: 16,
    borderTopWidth: 1, borderTopColor: C.border,
    backgroundColor: C.white,
  },
  cancelBtn: {
    flex: 1, height: 50, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: C.border,
  },
  cancelTxt: { fontSize: 15, fontWeight: '700', color: C.sub },
  saveBtn: {
    flex: 1, height: 50, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.dark,
  },
  saveBtnBusy: { opacity: 0.6 },
  saveTxt: { fontSize: 15, fontWeight: '800', color: C.white },
});
