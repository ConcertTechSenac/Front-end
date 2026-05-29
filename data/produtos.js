// Mapa de assets locais — usado quando imagem vem do banco como "local://filename"
const LOCAL_ASSETS = {
  'workstation_i7.jpg':       require('../assets/workstation_i7.jpg'),
  'mini_office_pc_pro.jpg':   require('../assets/mini_office_pc_pro.jpg'),
  'monitr_27_144hz.png':      require('../assets/monitr_27_144hz.png'),
  'teclado_mecanico_rgb.jpeg':require('../assets/teclado_mecanico_rgb.jpeg'),
  'webcam_4k.jpg':            require('../assets/webcam_4k.jpg'),
  'ssd_nvme.jpg':             require('../assets/ssd_nvme.jpg'),
  'memoria ram.jpeg':         require('../assets/memoria ram.jpeg'),
};

// Resolve a fonte da imagem:
//   number       → require() local direto (legado)
//   "local://x"  → asset local mapeado acima
//   "https://…"  → URL remota
export function fonteImagem(imagem) {
  if (typeof imagem === 'number') return imagem;
  if (typeof imagem === 'string' && imagem.startsWith('local://')) {
    const filename = imagem.replace('local://', '');
    return LOCAL_ASSETS[filename] ?? { uri: '' };
  }
  return { uri: imagem };
}

export const CATEGORIAS = [
  { id: 1, nome: 'Computadores', icone: 'computador', cor: '#E8F0FE' },
  { id: 2, nome: 'Notebooks',    icone: 'notebook',   cor: '#E3F2FD' },
  { id: 3, nome: 'Periféricos',  icone: 'sacola',     cor: '#F3E5F5' },
  { id: 4, nome: 'Componentes',  icone: 'chave',      cor: '#E8F5E9' },
];

// Fotos via Unsplash (w=500 para boa qualidade em mobile)
export const PRODUTOS_INICIAIS = [
  // ── Computadores ──
  {
    id: 1,
    nome: 'PC Gamer Pro',
    nomeShort: 'PC Gamer Pro',
    descricao:
      'Processador Intel Core i9-13900K de 13ª geração, 32GB RAM DDR5 5600MHz, placa NVIDIA RTX 4080 16GB GDDR6X, SSD NVMe 2TB. Gabinete full tower RGB com refrigeração líquida 360mm. Ideal para jogos AAA e edição profissional.',
    preco: 6499.99,
    precoOriginal: 7299.99,
    categoria: 'Computadores',
    avaliacao: 4.8,
    avaliacoes: 124,
    estoque: 8,
    imagem: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80&auto=format&fit=crop',
    cor: '#1A2DA8',
    destaque: true,
  },
  {
    id: 7,
    nome: 'PC Workstation i7',
    nomeShort: 'Workstation i7',
    descricao:
      'Intel Core i7-13700K, 32GB RAM DDR5, NVIDIA RTX 3060 12GB, SSD NVMe 1TB + HDD 2TB. Gabinete mid-tower silencioso. Ideal para criação de conteúdo, programação e multitarefa exigente.',
    preco: 4799.99,
    precoOriginal: 5299.99,
    categoria: 'Computadores',
    avaliacao: 4.6,
    avaliacoes: 78,
    estoque: 12,
    imagem: require('../assets/workstation_i7.jpg'),
    cor: '#283593',
    destaque: false,
  },
  {
    id: 8,
    nome: 'Mini PC Office Pro',
    nomeShort: 'Mini PC Office',
    descricao:
      'Intel Core i5-1235U, 16GB RAM LPDDR4X, SSD 512GB. Formato compacto USFF, consumo de apenas 15W. Quatro saídas de vídeo simultâneas. Perfeito para escritório e home office.',
    preco: 1799.99,
    precoOriginal: 2099.99,
    categoria: 'Computadores',
    avaliacao: 4.4,
    avaliacoes: 55,
    estoque: 20,
    imagem: require('../assets/mini_office_pc_pro.jpg'),
    cor: '#37474F',
    destaque: false,
  },

  // ── Notebooks ──
  {
    id: 2,
    nome: 'Notebook Ultra Slim 15"',
    nomeShort: 'Notebook Ultra',
    descricao:
      'AMD Ryzen 9 7940HS, tela OLED 15.6" 2.8K 120Hz, 16GB LPDDR5, SSD NVMe 1TB. Corpo alumínio de apenas 1.7kg, bateria 86Wh com até 12h de autonomia.',
    preco: 4299.99,
    precoOriginal: 4899.99,
    categoria: 'Notebooks',
    avaliacao: 4.6,
    avaliacoes: 87,
    estoque: 15,
    imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80&auto=format&fit=crop',
    cor: '#0D47A1',
    destaque: true,
  },
  {
    id: 9,
    nome: 'Notebook Gamer 17" RTX 4070',
    nomeShort: 'Notebook Gamer 17"',
    descricao:
      'Intel Core i7-13700H, tela IPS 17.3" FHD 144Hz, NVIDIA RTX 4070 8GB, 16GB DDR5, SSD 1TB NVMe. Design agressivo com iluminação RGB por zona. Resfriamento duplo fan com 6 heatpipes.',
    preco: 5899.99,
    precoOriginal: 6499.99,
    categoria: 'Notebooks',
    avaliacao: 4.7,
    avaliacoes: 63,
    estoque: 9,
    imagem: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80&auto=format&fit=crop',
    cor: '#B71C1C',
    destaque: true,
  },
  {
    id: 10,
    nome: 'Notebook Empresarial 14"',
    nomeShort: 'Notebook Empresarial',
    descricao:
      'Intel Core i5-1335U, tela FHD IPS 14" anti-reflexo, 8GB DDR4, SSD 512GB. Certificação MIL-STD-810H, leitor de digital, webcam HD com privacidade física. Bateria 72Wh com carregamento rápido.',
    preco: 2699.99,
    precoOriginal: 3099.99,
    categoria: 'Notebooks',
    avaliacao: 4.3,
    avaliacoes: 102,
    estoque: 18,
    imagem: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80&auto=format&fit=crop',
    cor: '#1B5E20',
    destaque: false,
  },

  // ── Periféricos ──
  {
    id: 3,
    nome: 'Monitor 27" 144Hz QHD',
    nomeShort: 'Monitor 27" 144Hz',
    descricao:
      'Painel IPS QHD 2560×1440, 144Hz, 1ms MPRT. AMD FreeSync Premium e G-Sync Compatible. Ajuste de altura, inclinação e rotação. 2× HDMI 2.0 + 1× DisplayPort 1.4.',
    preco: 1399.99,
    precoOriginal: 1699.99,
    categoria: 'Periféricos',
    avaliacao: 4.7,
    avaliacoes: 203,
    estoque: 22,
    imagem: require('../assets/monitr_27_144hz.png'),
    cor: '#004D40',
    destaque: true,
  },
  {
    id: 4,
    nome: 'Mouse Gamer RGB 16000 DPI',
    nomeShort: 'Mouse Gamer RGB',
    descricao:
      'Sensor óptico 16000 DPI com 6 níveis, 8 botões programáveis, iluminação RGB por zonas, polling rate 1000Hz, peso ajustável. Cabo trançado 1.8m.',
    preco: 229.99,
    precoOriginal: 299.99,
    categoria: 'Periféricos',
    avaliacao: 4.5,
    avaliacoes: 412,
    estoque: 47,
    imagem: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80&auto=format&fit=crop',
    cor: '#B71C1C',
    destaque: false,
  },
  {
    id: 6,
    nome: 'Teclado Mecânico RGB TKL',
    nomeShort: 'Teclado Mecânico',
    descricao:
      'TKL com switches Cherry MX Red, iluminação RGB por tecla, corpo em alumínio escovado, teclas PBT doubleshot, conexão USB-C destacável. Anti-ghosting completo.',
    preco: 379.99,
    precoOriginal: 449.99,
    categoria: 'Periféricos',
    avaliacao: 4.7,
    avaliacoes: 156,
    estoque: 19,
    imagem: require('../assets/teclado_mecanico_rgb.jpeg'),
    cor: '#1B5E20',
    destaque: false,
  },
  {
    id: 11,
    nome: 'Headset Gamer 7.1 Surround',
    nomeShort: 'Headset Gamer 7.1',
    descricao:
      'Áudio 7.1 surround virtual, drivers 50mm, microfone retrátil com cancelamento de ruído, almofadas de couro espuma-memória. Compatível com PC, PS5 e Xbox via USB + P2.',
    preco: 319.99,
    precoOriginal: 399.99,
    categoria: 'Periféricos',
    avaliacao: 4.5,
    avaliacoes: 189,
    estoque: 31,
    imagem: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&q=80&auto=format&fit=crop',
    cor: '#6A1B9A',
    destaque: false,
  },
  {
    id: 12,
    nome: 'Webcam 4K 60fps',
    nomeShort: 'Webcam 4K',
    descricao:
      'Resolução 4K 30fps / 1080p 60fps, sensor Sony CMOS, autofoco por IA, campo de visão 90°, microfone duplo com cancelamento de eco. Plug-and-play USB-C. Ideal para streaming e videoconferências.',
    preco: 499.99,
    precoOriginal: 649.99,
    categoria: 'Periféricos',
    avaliacao: 4.6,
    avaliacoes: 74,
    estoque: 14,
    imagem: require('../assets/webcam_4k.jpg'),
    cor: '#00838F',
    destaque: false,
  },

  // ── Componentes ──
  {
    id: 5,
    nome: 'SSD NVMe 1TB Gen4',
    nomeShort: 'SSD NVMe 1TB',
    descricao:
      'M.2 NVMe PCIe 4.0 x4 com leitura até 7000MB/s e escrita 6500MB/s. Fator M.2 2280, compatível com PS5 e PCs de alta performance. Inclui dissipador. Garantia 5 anos.',
    preco: 469.99,
    precoOriginal: 599.99,
    categoria: 'Componentes',
    avaliacao: 4.9,
    avaliacoes: 318,
    estoque: 34,
    imagem: require('../assets/ssd_nvme.jpg'),
    cor: '#4A148C',
    destaque: false,
  },
  {
    id: 13,
    nome: 'Placa de Vídeo RTX 4060 8GB',
    nomeShort: 'RTX 4060 8GB',
    descricao:
      'NVIDIA GeForce RTX 4060 8GB GDDR6, arquitetura Ada Lovelace, DLSS 3, Ray Tracing, clock boost 2460MHz. Dual fan, TDP 115W. Ótima relação custo-benefício para 1080p e 1440p.',
    preco: 2199.99,
    precoOriginal: 2599.99,
    categoria: 'Componentes',
    avaliacao: 4.7,
    avaliacoes: 241,
    estoque: 11,
    imagem: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=500&q=80&auto=format&fit=crop',
    cor: '#1A237E',
    destaque: true,
  },
  {
    id: 14,
    nome: 'Memória RAM DDR5 32GB 5600MHz',
    nomeShort: 'RAM DDR5 32GB',
    descricao:
      'Kit 2×16GB DDR5 5600MHz CL36, dissipador alumínio RGB ARGB. Compatível com Intel 12ª/13ª/14ª geração e AMD AM5. XMP 3.0 para overclock automático via BIOS.',
    preco: 599.99,
    precoOriginal: 749.99,
    categoria: 'Componentes',
    avaliacao: 4.8,
    avaliacoes: 137,
    estoque: 26,
    imagem: require('../assets/memoria ram.jpeg'),
    cor: '#880E4F',
    destaque: false,
  },
  {
    id: 15,
    nome: 'Processador AMD Ryzen 7 7700X',
    nomeShort: 'Ryzen 7 7700X',
    descricao:
      '8 núcleos / 16 threads, clock base 4.5GHz boost até 5.4GHz, cache L3 32MB, TDP 105W. Arquitetura Zen 4 com suporte a DDR5 e PCIe 5.0. Sem cooler incluso.',
    preco: 1499.99,
    precoOriginal: 1899.99,
    categoria: 'Componentes',
    avaliacao: 4.9,
    avaliacoes: 209,
    estoque: 17,
    imagem: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80&auto=format&fit=crop',
    cor: '#E65100',
    destaque: false,
  },
];
