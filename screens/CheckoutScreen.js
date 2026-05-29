import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, TextInput, Alert, Image, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function maskCartao(raw) {
  // mantém só dígitos, agrupa em blocos de 4
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function maskValidade(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + '/' + digits.slice(2);
}

// ─── Constantes de pagamento ──────────────────────────────────────────────────

const METODOS = [
  { id: 'credito', label: 'Crédito',  icone: '💳', cor: '#1A2DA8' },
  { id: 'debito',  label: 'Débito',   icone: '💳', cor: '#0D47A1' },
  { id: 'pix',     label: 'Pix',      icone: '⚡', cor: '#2E7D32' },
  { id: 'boleto',  label: 'Boleto',   icone: '📄', cor: '#E65100' },
];

const PARCELAS = [1, 2, 3, 4, 5, 6, 10, 12];

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function CampoInput({ label, value, onChange, placeholder, teclado, maxLen, mask, seguro }) {
  return (
    <View style={s.campo}>
      <Text style={s.campoLabel}>{label}</Text>
      <TextInput
        style={s.campoInput}
        value={value}
        onChangeText={v => onChange(mask ? mask(v) : v)}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        keyboardType={teclado ?? 'default'}
        maxLength={maxLen}
        secureTextEntry={!!seguro}
        autoCorrect={false}
      />
    </View>
  );
}

function LinhaResumo({ label, valor, destaque, verde }) {
  return (
    <View style={[s.resumoLinha, destaque && s.resumoLinhaDestaque]}>
      <Text style={[s.resumoLabel, destaque && s.resumoLabelDestaque]}>{label}</Text>
      <Text style={[s.resumoValor, destaque && s.resumoValorDestaque, verde && s.verde]}>
        {valor}
      </Text>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function CheckoutScreen({ navigation }) {
  const { itens, total, totalItens, limparCarrinho } = useCart();
  const { atualizarEstoque } = useProducts();

  const frete       = total >= 299 ? 0 : 29.90;
  const totalFinal  = total + frete;

  // Pagamento
  const [metodo,    setMetodo]    = useState('credito');
  const [parcelas,  setParcelas]  = useState(1);
  // Cartão
  const [numero,    setNumero]    = useState('');
  const [nome,      setNome]      = useState('');
  const [validade,  setValidade]  = useState('');
  const [cvv,       setCvv]       = useState('');
  // Pix / Boleto
  const [copiado,   setCopiado]   = useState(false);

  const PIX_CHAVE   = '11.222.333/0001-44';
  const BOLETO_COD  = '34191.09008 00009.277285 07000.010100 8 93580000050000';
  const BOLETO_VEN  = (() => {
    const d = new Date(); d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('pt-BR');
  })();

  const copiar = (texto) => {
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
    // Em produção: Clipboard.setStringAsync(texto)
  };

  // ── Validação ──────────────────────────────────────────────────────────────

  const validar = () => {
    if (metodo === 'credito' || metodo === 'debito') {
      if (numero.replace(/\s/g, '').length < 16) return 'Número do cartão inválido.';
      if (!nome.trim())                           return 'Informe o nome no cartão.';
      if (validade.length < 5)                    return 'Validade inválida.';
      if (cvv.length < 3)                         return 'CVV inválido.';
    }
    return null;
  };

  const confirmar = () => {
    const err = validar();
    if (err) { Alert.alert('Atenção', err); return; }

    const labelMetodo = METODOS.find(m => m.id === metodo)?.label ?? metodo;
    const msgParcela  = metodo === 'credito' && parcelas > 1
      ? ` em ${parcelas}x de ${fmt(totalFinal / parcelas)}`
      : '';

    Alert.alert(
      '✅ Pedido confirmado!',
      `Pagamento via ${labelMetodo}${msgParcela}.\nTotal: ${fmt(totalFinal)}\n\nObrigado pela sua compra!`,
      [{
        text: 'OK',
        onPress: async () => {
          // Debita estoque de cada item comprado
          for (const item of itens) {
            await atualizarEstoque(item.id, -item.quantidade);
          }
          limparCarrinho();
          navigation.navigate('Home');
        },
      }]
    );
  };

  // ── Render dos métodos ─────────────────────────────────────────────────────

  const renderCartao = (isCredito) => (
    <View style={s.formSection}>
      {/* Cartão visual */}
      <View style={[s.cartaoVisual, { backgroundColor: isCredito ? '#1A2DA8' : '#0D47A1' }]}>
        <View style={s.cartaoChip} />
        <Text style={s.cartaoNumero}>
          {numero ? numero.padEnd(19, '·').replace(/ /g, ' ') : '·····  ·····  ·····  ·····'}
        </Text>
        <View style={s.cartaoRodape}>
          <View>
            <Text style={s.cartaoRodapeLabel}>NOME</Text>
            <Text style={s.cartaoRodapeValor} numberOfLines={1}>
              {nome || 'SEU NOME'}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.cartaoRodapeLabel}>VALIDADE</Text>
            <Text style={s.cartaoRodapeValor}>{validade || 'MM/AA'}</Text>
          </View>
        </View>
      </View>

      <CampoInput
        label="Número do cartão"
        value={numero}
        onChange={setNumero}
        placeholder="0000 0000 0000 0000"
        teclado="numeric"
        maxLen={19}
        mask={maskCartao}
      />
      <CampoInput
        label="Nome impresso no cartão"
        value={nome}
        onChange={v => setNome(v.toUpperCase())}
        placeholder="COMO ESTÁ NO CARTÃO"
      />
      <View style={s.row2}>
        <View style={s.col}>
          <CampoInput
            label="Validade"
            value={validade}
            onChange={setValidade}
            placeholder="MM/AA"
            teclado="numeric"
            maxLen={5}
            mask={maskValidade}
          />
        </View>
        <View style={s.col}>
          <CampoInput
            label="CVV"
            value={cvv}
            onChange={v => setCvv(v.replace(/\D/g, '').slice(0, 4))}
            placeholder="···"
            teclado="numeric"
            maxLen={4}
            seguro
          />
        </View>
      </View>

      {isCredito && (
        <View style={s.parcelasSection}>
          <Text style={s.parcelasLabel}>Parcelas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.parcelasScroll}>
            {PARCELAS.map(n => {
              const valorParcela = totalFinal / n;
              const ativo = parcelas === n;
              return (
                <TouchableOpacity
                  key={n}
                  style={[s.parcelaBotao, ativo && s.parcelaBotaoAtivo]}
                  onPress={() => setParcelas(n)}
                  activeOpacity={0.75}
                >
                  <Text style={[s.parcelaN, ativo && s.parcelaNAtivo]}>{n}x</Text>
                  <Text style={[s.parcelaValor, ativo && s.parcelaValorAtivo]}>
                    {fmt(valorParcela)}
                  </Text>
                  {n === 1 && <Text style={[s.parcelaSemJuros, ativo && s.parcelaSemJurosAtivo]}>sem juros</Text>}
                  {n > 1 && n <= 6 && <Text style={[s.parcelaSemJuros, ativo && s.parcelaSemJurosAtivo]}>sem juros</Text>}
                  {n > 6 && <Text style={[s.parcelaComJuros, ativo && { color: '#FFE082' }]}>+juros</Text>}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const renderPix = () => (
    <View style={s.formSection}>
      <View style={s.pixContainer}>
        {/* QR Code simulado */}
        <View style={s.qrBox}>
          <View style={s.qrInner}>
            {/* Quadrantes de posição */}
            {[0, 1, 2].map(i => (
              <View key={i} style={[s.qrCanto, {
                top: i === 2 ? undefined : 4,
                bottom: i === 2 ? 4 : undefined,
                left: i === 1 ? undefined : 4,
                right: i === 1 ? 4 : undefined,
              }]} />
            ))}
            {/* Grid simulado */}
            <View style={s.qrGrid}>
              {Array.from({ length: 49 }).map((_, i) => (
                <View
                  key={i}
                  style={[s.qrCell, (i * 7 + i) % 3 === 0 && s.qrCellOn]}
                />
              ))}
            </View>
          </View>
          <Text style={s.qrLabel}>QR Code Pix</Text>
        </View>

        <Text style={s.pixTitulo}>Chave Pix (CNPJ)</Text>
        <View style={s.pixChaveRow}>
          <Text style={s.pixChave} selectable>{PIX_CHAVE}</Text>
          <TouchableOpacity
            style={[s.pixCopiarBtn, copiado && s.pixCopiarBtnOk]}
            onPress={() => copiar(PIX_CHAVE)}
            activeOpacity={0.8}
          >
            <Text style={s.pixCopiarTxt}>{copiado ? '✓ Copiado' : 'Copiar'}</Text>
          </TouchableOpacity>
        </View>

        <View style={s.pixInfo}>
          <Text style={s.pixInfoTxt}>• O pagamento é confirmado em até 1 minuto</Text>
          <Text style={s.pixInfoTxt}>• Disponível 24h, todos os dias</Text>
          <Text style={s.pixInfoTxt}>• Código expira em 30 minutos</Text>
        </View>
      </View>
    </View>
  );

  const renderBoleto = () => (
    <View style={s.formSection}>
      <View style={s.boletoContainer}>
        {/* Código de barras visual */}
        <View style={s.barcodeBox}>
          {Array.from({ length: 60 }).map((_, i) => (
            <View
              key={i}
              style={[
                s.barLine,
                { width: [1, 2, 1, 3, 1, 2][i % 6], backgroundColor: i % 5 === 0 ? '#fff' : '#111' },
              ]}
            />
          ))}
        </View>

        <Text style={s.boletoTitulo}>Código do boleto</Text>
        <Text style={s.boletoCodigo} selectable>{BOLETO_COD}</Text>
        <TouchableOpacity
          style={[s.pixCopiarBtn, s.boletoCopiarBtn, copiado && s.pixCopiarBtnOk]}
          onPress={() => copiar(BOLETO_COD)}
          activeOpacity={0.8}
        >
          <Text style={s.pixCopiarTxt}>{copiado ? '✓ Copiado' : 'Copiar linha digitável'}</Text>
        </TouchableOpacity>

        <View style={s.pixInfo}>
          <Text style={s.pixInfoTxt}>• Vencimento: <Text style={{ fontWeight: '700' }}>{BOLETO_VEN}</Text></Text>
          <Text style={s.pixInfoTxt}>• Pague em qualquer banco ou lotérica</Text>
          <Text style={s.pixInfoTxt}>• Confirmação em até 3 dias úteis</Text>
        </View>
      </View>
    </View>
  );

  // ── Render principal ───────────────────────────────────────────────────────

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={s.btnVoltar}>
          <Text style={s.setaVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Pagamento</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* ── Resumo do pedido ── */}
        <View style={s.card}>
          <Text style={s.secaoTitulo}>Resumo do pedido</Text>
          <LinhaResumo label={`Subtotal (${totalItens} iten${totalItens !== 1 ? 's' : ''})`} valor={fmt(total)} />
          <LinhaResumo label="Frete" valor={frete === 0 ? 'Grátis' : fmt(frete)} verde={frete === 0} />
          <LinhaResumo label="Total" valor={fmt(totalFinal)} destaque />
        </View>

        {/* ── Método de pagamento ── */}
        <View style={s.card}>
          <Text style={s.secaoTitulo}>Forma de pagamento</Text>

          <View style={s.metodosGrid}>
            {METODOS.map(m => {
              const ativo = metodo === m.id;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[s.metodoBotao, ativo && { borderColor: m.cor, backgroundColor: m.cor + '12' }]}
                  onPress={() => setMetodo(m.id)}
                  activeOpacity={0.8}
                >
                  <Text style={s.metodoIcone}>{m.icone}</Text>
                  <Text style={[s.metodoLabel, ativo && { color: m.cor, fontWeight: '700' }]}>
                    {m.label}
                  </Text>
                  {ativo && (
                    <View style={[s.metodoCheck, { backgroundColor: m.cor }]}>
                      <Text style={s.metodoCheckTxt}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Conteúdo do método selecionado ── */}
        <View style={s.card}>
          {metodo === 'credito' && renderCartao(true)}
          {metodo === 'debito'  && renderCartao(false)}
          {metodo === 'pix'     && renderPix()}
          {metodo === 'boleto'  && renderBoleto()}
        </View>

        {/* Segurança */}
        <View style={s.seguranca}>
          <Text style={s.segurancaTxt}>🔒 Pagamento 100% seguro e criptografado</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botão fixo de confirmação */}
      <View style={s.footer}>
        <TouchableOpacity style={s.btnConfirmar} onPress={confirmar} activeOpacity={0.85}>
          <Text style={s.btnConfirmarTxt}>
            {metodo === 'pix'    ? 'Já paguei o Pix'    :
             metodo === 'boleto' ? 'Gerar Boleto'        :
                                   `Pagar ${fmt(totalFinal)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12, paddingVertical: 14,
  },
  btnVoltar: { padding: 4, marginRight: 8, width: 36 },
  setaVoltar: { fontSize: 22, color: COLORS.white, fontWeight: '700' },
  headerTitulo: { flex: 1, fontSize: 17, fontWeight: '700', color: COLORS.white, textAlign: 'center' },

  // Cards de seção
  card: {
    backgroundColor: COLORS.white, marginHorizontal: 16, marginTop: 14,
    borderRadius: 16, padding: 18,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4,
  },
  secaoTitulo: {
    fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 14,
  },

  // Resumo
  resumoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resumoLinhaDestaque: {
    borderTopWidth: 1, borderTopColor: COLORS.gray100,
    marginTop: 6, paddingTop: 12, marginBottom: 0,
  },
  resumoLabel: { fontSize: 14, color: COLORS.gray600 },
  resumoLabelDestaque: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  resumoValor: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  resumoValorDestaque: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  verde: { color: '#2E7D32' },

  // Métodos de pagamento
  metodosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metodoBotao: {
    width: '47%', paddingVertical: 14, paddingHorizontal: 10,
    borderRadius: 12, borderWidth: 2, borderColor: COLORS.gray200,
    backgroundColor: COLORS.white, alignItems: 'center',
    position: 'relative',
  },
  metodoIcone: { fontSize: 26, marginBottom: 6 },
  metodoLabel: { fontSize: 13, fontWeight: '600', color: COLORS.gray600 },
  metodoCheck: {
    position: 'absolute', top: 8, right: 8,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  metodoCheckTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // Seção de formulário
  formSection: {},

  // Cartão visual
  cartaoVisual: {
    borderRadius: 16, padding: 20, marginBottom: 20,
    height: 180, justifyContent: 'space-between',
    elevation: 4,
  },
  cartaoChip: {
    width: 40, height: 30, borderRadius: 6,
    backgroundColor: '#FFD700', opacity: 0.85,
  },
  cartaoNumero: {
    fontSize: 18, fontWeight: '700', color: '#fff',
    letterSpacing: 2, textAlign: 'center',
  },
  cartaoRodape: { flexDirection: 'row', justifyContent: 'space-between' },
  cartaoRodapeLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: '600', letterSpacing: 1 },
  cartaoRodapeValor: { fontSize: 14, color: '#fff', fontWeight: '700', marginTop: 2, maxWidth: 150 },

  // Campos de input
  campo: { marginBottom: 14 },
  campoLabel: { fontSize: 12, fontWeight: '700', color: COLORS.gray600, marginBottom: 6, letterSpacing: 0.3 },
  campoInput: {
    borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 11,
    fontSize: 15, color: COLORS.text, backgroundColor: '#FAFBFF',
  },
  row2: { flexDirection: 'row', gap: 12 },
  col:  { flex: 1 },

  // Parcelas
  parcelasSection: { marginTop: 4 },
  parcelasLabel: { fontSize: 12, fontWeight: '700', color: COLORS.gray600, marginBottom: 10, letterSpacing: 0.3 },
  parcelasScroll: { marginHorizontal: -4 },
  parcelaBotao: {
    alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 12, borderWidth: 1.5, borderColor: COLORS.gray200,
    backgroundColor: COLORS.white, marginHorizontal: 4, minWidth: 80,
  },
  parcelaBotaoAtivo: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  parcelaN:          { fontSize: 15, fontWeight: '800', color: COLORS.gray600 },
  parcelaNAtivo:     { color: '#fff' },
  parcelaValor:      { fontSize: 11, color: COLORS.gray400, marginTop: 2 },
  parcelaValorAtivo: { color: 'rgba(255,255,255,0.9)' },
  parcelaSemJuros:   { fontSize: 10, color: '#2E7D32', marginTop: 1, fontWeight: '600' },
  parcelaSemJurosAtivo: { color: '#A5D6A7' },
  parcelaComJuros:   { fontSize: 10, color: '#E65100', marginTop: 1 },

  // Pix
  pixContainer: { alignItems: 'center' },
  qrBox: { alignItems: 'center', marginBottom: 20 },
  qrInner: {
    width: 160, height: 160,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
    borderRadius: 8, padding: 12, position: 'relative',
    justifyContent: 'center', alignItems: 'center',
  },
  qrCanto: {
    position: 'absolute', width: 30, height: 30,
    borderWidth: 4, borderColor: '#111', borderRadius: 4,
  },
  qrGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 100, height: 100 },
  qrCell: { width: 100 / 7, height: 100 / 7, backgroundColor: 'transparent' },
  qrCellOn: { backgroundColor: '#111' },
  qrLabel: { fontSize: 12, color: COLORS.gray400, marginTop: 8 },
  pixTitulo: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  pixChaveRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.background, borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 14, width: '100%', marginBottom: 16,
  },
  pixChave: { flex: 1, fontSize: 13, color: COLORS.text, fontWeight: '600' },
  pixCopiarBtn: {
    backgroundColor: COLORS.primary, paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 8,
  },
  pixCopiarBtnOk: { backgroundColor: '#2E7D32' },
  pixCopiarTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },
  pixInfo: { width: '100%', gap: 6 },
  pixInfoTxt: { fontSize: 13, color: COLORS.gray600 },

  // Boleto
  boletoContainer: { alignItems: 'center' },
  barcodeBox: {
    flexDirection: 'row', height: 80, alignItems: 'stretch',
    backgroundColor: '#fff', paddingHorizontal: 12,
    borderRadius: 8, borderWidth: 1, borderColor: '#ddd',
    overflow: 'hidden', marginBottom: 16, width: '100%',
  },
  barLine: { flex: 0, height: '100%', marginHorizontal: 0.5 },
  boletoTitulo: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  boletoCodigo: {
    fontSize: 11, color: COLORS.gray600, textAlign: 'center',
    lineHeight: 18, marginBottom: 12, paddingHorizontal: 8,
  },
  boletoCopiarBtn: { alignSelf: 'center', marginBottom: 16 },

  // Segurança
  seguranca: { alignItems: 'center', marginTop: 12, marginBottom: 4 },
  segurancaTxt: { fontSize: 12, color: COLORS.gray400 },

  // Footer
  footer: {
    padding: 16, backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.gray100,
  },
  btnConfirmar: {
    backgroundColor: COLORS.primary, borderRadius: 14,
    height: 54, alignItems: 'center', justifyContent: 'center',
  },
  btnConfirmarTxt: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
});
