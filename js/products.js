/* ============================================================
 *  AVROZ RETROGAMES — Catálogo de produtos (dados)
 *  Produtos oficiais da linha Neo Geo AES+ importados de
 *  https://shop.ultraarcadebh.com.br/ (Ultra Arcade).
 * ============================================================ */

const PRODUCTS = [
  // ============================================================
  //  CONSOLES NEO GEO AES+ — 3 edições independentes
  // ============================================================

  // ----------------- ORIGINAL (Preto) -----------------
  {
    id: "neo-geo-aes-plus-original",
    name: "Neo Geo AES+ Original",
    category: "consoles",
    platform: "neogeo",
    price: 3200.0,
    oldPrice: null,
    image: "img/NEOGEO_Product.png",
    gallery: [
      "img/NEOGEO_Product.png",
      "img/neogeo1.webp",
      "img/neogeo4.webp",
      "img/neogeo5.webp",
      "img/neogeo6.webp",
      "img/neogeo2.webp",
    ],
    description:
      "A versão Original é a porta de entrada para a linha Neo Geo AES+. Mantém a proposta central do sistema com foco na experiência original de jogo em hardware dedicado. Desenvolvido com chips ASIC para execução nativa — sem emulação tradicional — e compatível com cartuchos Neo Geo AES originais e novos.",
    longDescription: `
      <h3>Sobre o Neo Geo AES+ Original</h3>
      <p>O Neo Geo AES+ marca o retorno oficial de um dos consoles mais icônicos da SNK. A edição <strong>Original</strong> é apresentada em acabamento <strong>preto clássico</strong> e entrega tudo o que o entusiasta precisa para voltar a jogar em hardware dedicado.</p>

      <h4>Conteúdo da embalagem</h4>
      <ul>
        <li>Console Neo Geo AES+ Preto</li>
        <li>1 Arcade Stick com conexão de 15 pinos</li>
        <li>Cabo HDMI</li>
        <li>Fonte de alimentação</li>
      </ul>

      <h4>Principais características</h4>
      <ul>
        <li>Execução nativa com chips ASIC</li>
        <li>Compatível com cartuchos Neo Geo AES originais e novos</li>
        <li>Saída HDMI</li>
        <li>Saída AV (setups retrô)</li>
        <li>Interruptores DIP</li>
        <li>Slot para memory card</li>
      </ul>

      <p><strong>Lançamento:</strong> 12 de novembro de 2026 — pré-venda aberta com preço fixo.</p>
    `,
    badge: "TOP",
    stock: 12,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Edição: "Original",
      Cor: "Preto",
      Hardware: "Chips ASIC (execução nativa)",
      Saídas: "HDMI + AV",
      Compatibilidade: "Cartuchos Neo Geo AES originais e novos",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  // ----------------- ANNIVERSARY (Branco) -----------------
  {
    id: "neo-geo-aes-plus-anniversary",
    name: "Neo Geo AES+ Anniversary",
    category: "consoles",
    platform: "neogeo",
    price: 4700.0,
    oldPrice: null,
    image: "img/neogeo12.webp",
    gallery: [
      "img/neogeo12.webp",
      "img/neogeo4.webp",
      "img/neogeo5.webp",
      "img/neogeo6.webp",
      "img/neogeo2.webp",
      "img/neogeo1.webp",
    ],
    description:
      "A Anniversary Edition é a edição comemorativa da linha Neo Geo AES+, apresentada em acabamento branco e com itens extras voltados para coleção e uso expandido. Inclui joystick sem fio, Memory Card e o cartucho de Metal Slug já no pacote.",
    longDescription: `
      <h3>Sobre o Neo Geo AES+ Anniversary</h3>
      <p>A edição <strong>Anniversary</strong> celebra a linha com acabamento <strong>branco exclusivo</strong> e um kit mais generoso — pensada para colecionadores e fãs que querem começar jogando sem precisar comprar acessórios separadamente.</p>

      <h4>Conteúdo da embalagem</h4>
      <ul>
        <li>Console Neo Geo AES+ Anniversary Edition (branco)</li>
        <li>1 Joystick arcade sem fio de 15 pinos</li>
        <li>Cartucho Metal Slug</li>
        <li>Memory Card</li>
        <li>Cabos inclusos</li>
      </ul>

      <h4>Principais características</h4>
      <ul>
        <li>Execução nativa com chips ASIC</li>
        <li>Compatível com cartuchos Neo Geo AES originais e novos</li>
        <li>Saída HDMI</li>
        <li>Saída AV</li>
        <li>Edição limitada na cor branca</li>
      </ul>

      <p><strong>Lançamento:</strong> 12 de novembro de 2026 — pré-venda aberta com preço fixo.</p>
    `,
    badge: "NEW",
    stock: 6,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Edição: "Anniversary",
      Cor: "Branco",
      Hardware: "Chips ASIC (execução nativa)",
      Saídas: "HDMI + AV",
      Compatibilidade: "Cartuchos Neo Geo AES originais e novos",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  // ----------------- ULTIMATE (Premium numerada) -----------------
  {
    id: "neo-geo-aes-plus-ultimate",
    name: "Neo Geo AES+ Ultimate",
    category: "consoles",
    platform: "neogeo",
    price: 10200.0,
    oldPrice: null,
    image: "img/neogeo3.webp",
    gallery: [
      "img/neogeo3.webp",
      "img/neogeo10.webp",
      "img/neogeo11.webp",
      "img/neogeo7.webp",
      "img/neogeo8.webp",
      "img/neogeo9.webp",
      "img/neogeo4.webp",
    ],
    description:
      "A Ultimate Edition é a versão mais completa da linha Neo Geo AES+. Reúne o console, três controles, memory card e os dez cartuchos da primeira leva em uma caixa premium, com tiragem muito baixa e unidades numeradas de fábrica.",
    longDescription: `
      <h3>Sobre o Neo Geo AES+ Ultimate</h3>
      <p>A edição <strong>Ultimate</strong> é o bundle definitivo — tudo que você precisa para montar um setup Neo Geo completo já vem no pacote. Produção <strong>extremamente limitada</strong> com <strong>unidades numeradas de fábrica</strong>.</p>

      <h4>Conteúdo da embalagem</h4>
      <ul>
        <li>Console Neo Geo AES+</li>
        <li>1 Arcade Stick com fio</li>
        <li>1 Arcade Stick sem fio</li>
        <li>1 Gamepad sem fio</li>
        <li>1 Memory Card</li>
        <li>10 cartuchos do lançamento inicial</li>
        <li>Cabos e acessórios para uso imediato</li>
      </ul>

      <h4>Principais características</h4>
      <ul>
        <li>Bundle mais completo da linha</li>
        <li>Inclui acessórios e jogos em um único pacote</li>
        <li>Edição premium de produção extremamente limitada</li>
        <li>Console compatível com cartuchos Neo Geo AES originais e novos</li>
      </ul>

      <h4>10 jogos inclusos</h4>
      <ul>
        <li>Metal Slug</li>
        <li>The King of Fighters 2002</li>
        <li>Garou: Mark of the Wolves</li>
        <li>Big Tournament Golf</li>
        <li>Shock Troopers</li>
        <li>Samurai Shodown V Special</li>
        <li>Pulstar</li>
        <li>Twinkle Star Sprites</li>
        <li>Magician Lord</li>
        <li>Over Top</li>
      </ul>

      <p><strong>Lançamento:</strong> 12 de novembro de 2026 — pré-venda aberta com preço fixo.</p>
    `,
    badge: "TOP",
    stock: 3,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Edição: "Ultimate (numerada)",
      Cor: "Premium",
      Hardware: "Chips ASIC (execução nativa)",
      Saídas: "HDMI + AV",
      Compatibilidade: "Cartuchos Neo Geo AES originais e novos",
      Inclusos: "3 controles + Memory Card + 10 cartuchos",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda (numerada)",
    },
  },

  // ----------------- ARCADE STICK -----------------
  {
    id: "arcade-stick-neo-geo-aes",
    name: "Arcade Stick Neo Geo AES+",
    category: "controles",
    platform: "neogeo",
    price: 1299.99,
    oldPrice: null,
    image: "img/NEOGEOStick_Product.png",
    gallery: [
      "img/NEOGEOStick_Product.png",
      "img/neogeo13.webp",
      "img/neogeo4.webp",
      "img/neogeo14.webp",
    ],
    description:
      "Arcade Stick oficial da linha Neo Geo AES+, com conexão de 15 pinos. Disponível na versão com fio (preta) e sem fio (branca). Construído para reproduzir a sensação dos fliperamas clássicos com qualidade SNK.",
    badge: "NEW",
    stock: 15,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade",
      Conexão: "15 pinos",
      Versões: "Com fio (preta) e sem fio (branca)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  // ----------------- JOGOS AVULSOS (CARTUCHOS) -----------------
  {
    id: "jogo-metal-slug",
    name: "Metal Slug",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/metal-slug.jpg",
    gallery: ["img/games/metal-slug.jpg", "img/NEOGEOGame_Product.png"],
    description:
      "Run and gun lançado em 1996 pela Nazca/SNK. No controle dos soldados Marco Rossi e Tarma Roving, da Peregrine Falcon Strike Force, você enfrenta o golpe militar liderado por Donald Morden em 2028. O primeiro capítulo de uma das franquias mais cultuadas do Neo Geo.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p><strong>Metal Slug</strong> é o marco inicial de uma das séries mais icônicas de run and gun da história dos arcades. Desenvolvido pela Nazca Corporation e publicado pela SNK em 1996 para o Neo Geo MVS, o jogo estabeleceu um padrão gráfico absurdo para a época com sprites animados em quadros generosos, explosões detalhadas e humor característico.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Run and gun</li>
        <li>Jogadores: 1 a 2 (cooperativo)</li>
        <li>Ano: 1996 (Neo Geo MVS/AES)</li>
        <li>Desenvolvedora: Nazca Corporation</li>
        <li>Publisher: SNK</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: "TOP",
    stock: 15,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Run and gun",
      Ano: "1996",
      Jogadores: "1-2 (cooperativo)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-kof-2002",
    name: "The King of Fighters 2002",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/kof-2002.jpg",
    gallery: ["img/games/kof-2002.jpg", "img/NEOGEOGame_Product.png"],
    description:
      "Também conhecido como KOF '02, é o nono título da série The King of Fighters. Um verdadeiro dream match no estilo de KOF '98, reunindo personagens de diversas franquias da SNK em batalhas 3x3 sem enredo amarrado — só pancadaria pura.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p>Desenvolvido pela Eolith e publicado pela Playmore em 2002, <strong>The King of Fighters 2002: Challenge to Ultimate Battle</strong> é considerado por muitos fãs um dos melhores KOF já lançados. Com roster extenso, gameplay ajustado e equilíbrio competitivo elevado, é um clássico absoluto da cena de fighting games.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Luta (3 vs 3)</li>
        <li>Jogadores: 1 a 2 (versus)</li>
        <li>Ano: 2002 (Neo Geo MVS/AES)</li>
        <li>Desenvolvedora: Eolith</li>
        <li>Publisher: Playmore (SNK)</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: "TOP",
    stock: 15,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Luta",
      Ano: "2002",
      Jogadores: "1-2",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-garou-motw",
    name: "Garou: Mark of the Wolves",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/garou.png",
    gallery: ["img/games/garou.png", "img/NEOGEOGame_Product.png"],
    description:
      "Sexta entrada principal da série Fatal Fury (1999). Dez anos após Terry Bogard derrotar Geese Howard, ele e seu filho adotivo Rock Howard entram no torneio Maximum Mayhem de South Town. Apresenta mecânicas inovadoras como T.O.P e Just Defend.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p>Lançado pela SNK em 1999 para o Neo Geo, <strong>Garou: Mark of the Wolves</strong> trouxe um elenco quase totalmente novo (apenas Terry Bogard retorna) e mecânicas revolucionárias que elevaram o gênero. Até hoje é cultuado pelos fãs de jogos de luta como um dos ápices técnicos da SNK.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Luta 2D</li>
        <li>Jogadores: 1 a 2 (versus)</li>
        <li>Ano: 1999 (Neo Geo MVS/AES)</li>
        <li>Mecânicas: T.O.P. Mode, Just Defend, Breaking</li>
        <li>Desenvolvedora / Publisher: SNK</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: "TOP",
    stock: 15,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Luta",
      Ano: "1999",
      Jogadores: "1-2",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-big-tournament-golf",
    name: "Big Tournament Golf",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/big-tournament-golf.jpg",
    gallery: [
      "img/games/big-tournament-golf.jpg",
      "img/NEOGEOGame_Product.png",
    ],
    description:
      "Lançado internacionalmente como Neo Turf Masters, é um dos melhores jogos de golfe arcade de todos os tempos. Escolha entre 6 jogadores com estilos únicos e dispute 4 campos fictícios nos EUA, Japão, Austrália e Alemanha.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p>Desenvolvido pela Nazca em 1996 (mesma desenvolvedora de Metal Slug), <strong>Big Tournament Golf</strong> (Neo Turf Masters no ocidente) é um jogo de golfe arcade rápido, divertido e técnico. O sistema de swing de duplo clique e os campos criativos fizeram dele um clássico instantâneo.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Esporte (Golfe)</li>
        <li>Jogadores: 1 a 2</li>
        <li>Ano: 1996 (Neo Geo MVS/AES)</li>
        <li>6 golfistas jogáveis com atributos únicos</li>
        <li>4 campos: EUA, Japão, Austrália e Alemanha</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: null,
    stock: 15,
    featured: false,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Esporte (Golfe)",
      Ano: "1996",
      Jogadores: "1-2",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-shock-troopers",
    name: "Shock Troopers",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/shock-troopers.jpg",
    gallery: ["img/games/shock-troopers.jpg", "img/NEOGEOGame_Product.png"],
    description:
      "Run and gun em oito direções desenvolvido pela Saurus em 1997. Escolha entre modo Lonely Wolf (1 soldado) ou Team Battle (3 soldados alternáveis) para derrotar a organização terrorista Bloody Scorpions.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p><strong>Shock Troopers</strong> é um dos melhores top-down shooters do Neo Geo. Com trilha sonora marcante, rotas ramificadas (Montanha, Selva ou Vale) e oito soldados jogáveis com armas especiais únicas, ele oferece altíssimo valor de replay.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Run and gun top-down</li>
        <li>Jogadores: 1 a 2 (cooperativo)</li>
        <li>Ano: 1997 (Neo Geo MVS/AES)</li>
        <li>8 personagens jogáveis</li>
        <li>Rotas ramificadas e 7 fases</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: "TOP",
    stock: 15,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Run and gun",
      Ano: "1997",
      Jogadores: "1-2 (cooperativo)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-samurai-shodown-v-special",
    name: "Samurai Shodown V Special",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/samurai-shodown-v.png",
    gallery: [
      "img/games/samurai-shodown-v.png",
      "img/NEOGEOGame_Product.png",
    ],
    description:
      "O último jogo oficial lançado para o Neo Geo (2004) e a nona entrada da série Samurai Shodown. Versão aprimorada de Samurai Shodown V, com roster completo, novos movimentos finais e ajustes de balanceamento.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p><strong>Samurai Shodown V Special</strong> encerrou com maestria a era Neo Geo. Com gameplay baseado em armas brancas, combates tensos e roster memorável, é um marco histórico e final digno para o sistema.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Luta 2D (armas)</li>
        <li>Jogadores: 1 a 2 (versus)</li>
        <li>Ano: 2004 (Neo Geo MVS/AES)</li>
        <li>Último jogo oficial lançado para o Neo Geo</li>
        <li>Desenvolvedora / Publisher: SNK Playmore</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: "NEW",
    stock: 15,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Luta",
      Ano: "2004",
      Jogadores: "1-2",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-pulstar",
    name: "Pulstar",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/pulstar.jpg",
    gallery: ["img/games/pulstar.jpg", "img/NEOGEOGame_Product.png"],
    description:
      "Shoot'em up horizontal de 1995 frequentemente comparado ao R-Type. Oito fases de ação espacial intensa, inimigos em formações complexas e power-ups para defender o Sistema Solar de uma raça alienígena hostil.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p>Publicado pela SNK em 1995 para o Neo Geo MVS, <strong>Pulstar</strong> é uma verdadeira obra-prima do shoot'em up. Gráficos pré-renderizados impressionantes para a época, trilha sonora espacial e padrões de tiro desafiadores fazem dele um dos shooters clássicos mais respeitados.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Shoot'em up horizontal</li>
        <li>Jogadores: 1 a 2 (alternado)</li>
        <li>Ano: 1995 (Neo Geo MVS/AES)</li>
        <li>8 fases com chefes</li>
        <li>Sistema de voice pod (similar ao R-Type)</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: null,
    stock: 15,
    featured: false,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Shoot'em up",
      Ano: "1995",
      Jogadores: "1-2 (alternado)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-twinkle-star-sprites",
    name: "Twinkle Star Sprites",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/twinkle-star-sprites.jpg",
    gallery: [
      "img/games/twinkle-star-sprites.jpg",
      "img/NEOGEOGame_Product.png",
    ],
    description:
      "Shooter competitivo único lançado pela ADK em 1996. Dois jogadores disputam em telas verticais lado a lado, enviando ataques entre si através de combos e power-ups cronometrados. Uma fórmula criativa que influenciou toda uma subcultura de shooters versus.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p><strong>Twinkle Star Sprites</strong> foi o último jogo da ADK para o Neo Geo e trouxe um conceito inovador: shooter versus. Mais do que um simples shmup, é uma experiência competitiva intensa, com personagens fofos e gameplay profundo.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Shoot'em up competitivo</li>
        <li>Jogadores: 1 a 2 (versus)</li>
        <li>Ano: 1996 (Neo Geo MVS/AES)</li>
        <li>Desenvolvedora: ADK</li>
        <li>Combos de ataques redirecionáveis ao oponente</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: null,
    stock: 15,
    featured: false,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Shoot'em up versus",
      Ano: "1996",
      Jogadores: "1-2 (versus)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-magician-lord",
    name: "Magician Lord",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/magician-lord.jpg",
    gallery: ["img/games/magician-lord.jpg", "img/NEOGEOGame_Product.png"],
    description:
      "Um dos jogos de lançamento do Neo Geo MVS/AES (1990). Jogo de ação e plataforma desenvolvido pela Alpha Denshi, onde o mago Elta precisa recuperar os tomos mágicos roubados pelo bruxo Gal antes que o deus da destruição Az Atorse seja ressuscitado.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p><strong>Magician Lord</strong> fez história como um dos títulos de lançamento do Neo Geo. Com gráficos que impressionavam em 1990, trilha sonora memorável e dificuldade elevada, tornou-se um ícone do hardware — tanto que seu herói Elta é praticamente um mascote não-oficial do sistema.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Ação / Plataforma</li>
        <li>Jogadores: 1 a 2 (alternado)</li>
        <li>Ano: 1990 (título de lançamento Neo Geo)</li>
        <li>Desenvolvedora: Alpha Denshi</li>
        <li>Publisher: SNK</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: null,
    stock: 15,
    featured: false,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Ação / Plataforma",
      Ano: "1990",
      Jogadores: "1-2 (alternado)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  {
    id: "jogo-over-top",
    name: "Over Top",
    category: "jogos",
    platform: "neogeo",
    price: 999.0,
    oldPrice: null,
    image: "img/games/over-top.jpg",
    gallery: ["img/games/over-top.jpg", "img/NEOGEOGame_Product.png"],
    description:
      "Corrida arcade top-down da ADK (1996), sucessora espiritual de Thrash Rally. Pilote buggies, rally cars e picapes em circuitos variados — do deserto ao gelo — em uma experiência frenética no melhor estilo Neo Geo.",
    longDescription: `
      <h3>Sobre o jogo</h3>
      <p><strong>Over Top</strong> é uma preciosidade menos conhecida do catálogo Neo Geo. Com visão top-down, múltiplos veículos e pistas variadas, entrega o charme arcade clássico em uma fórmula de corrida rápida e acessível.</p>
      <h4>Destaques</h4>
      <ul>
        <li>Gênero: Corrida top-down</li>
        <li>Jogadores: 1 a 2 (alternado)</li>
        <li>Ano: 1996 (Neo Geo MVS/AES)</li>
        <li>Desenvolvedora: ADK</li>
        <li>Publisher: SNK</li>
      </ul>
      <p><strong>Cartucho oficial Neo Geo AES+</strong>, compatível com o console AES+ e com o AES original.</p>
    `,
    badge: null,
    stock: 15,
    featured: false,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade / SNK",
      Tipo: "Cartucho AES",
      Gênero: "Corrida",
      Ano: "1996",
      Jogadores: "1-2 (alternado)",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  // ----------------- GAMEPAD WIRELESS -----------------
  {
    id: "gamepad-wireless-neo-geo-aes",
    name: "Gamepad Wireless Neo Geo AES+",
    category: "controles",
    platform: "neogeo",
    price: 699.99,
    oldPrice: null,
    image: "img/NEOGEOPad_Product.png",
    gallery: ["img/NEOGEOPad_Product.png", "img/neogeo15.webp"],
    description:
      "Controle gamepad sem fio oficial Neo Geo AES+ na cor preta. Ideal para quem prefere o conforto de um joypad moderno mantendo a compatibilidade com o ecossistema AES+.",
    badge: null,
    stock: 20,
    featured: true,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade",
      Cor: "Preto",
      Conexão: "Sem fio (wireless)",
      Compatibilidade: "Neo Geo AES+",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },

  // ----------------- MEMORY CARD -----------------
  {
    id: "memory-card-neo-geo-aes",
    name: "Memory Card Neo Geo AES+",
    category: "acessorios",
    platform: "neogeo",
    price: 499.99,
    oldPrice: null,
    image: "img/NEOGEOMem_Product.png",
    gallery: [
      "img/NEOGEOMem_Product.png",
      "img/neogeo16.webp",
      "img/neogeo17.webp",
    ],
    description:
      "Memory Card oficial da linha Neo Geo AES+, disponível nas versões preta ou branca. Acessório essencial para salvar progresso nos cartuchos compatíveis.",
    badge: null,
    stock: 40,
    featured: false,
    promo: false,
    preorder: true,
    meta: {
      Marca: "Ultra Arcade",
      Cores: "Preto ou branco",
      Compatibilidade: "Neo Geo AES+ e AES original",
      Lançamento: "12 de novembro de 2026",
      Condição: "Pré-venda",
    },
  },
];

/* ============================================================
 *  Labels e helpers
 * ============================================================ */

const CATEGORY_LABELS = {
  consoles: "Consoles",
  jogos: "Jogos",
  controles: "Controles",
  acessorios: "Acessórios",
};

const PLATFORM_LABELS = {
  neogeo: "Neo Geo AES+",
};

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function calcDiscount(p) {
  if (!p.oldPrice || p.oldPrice <= p.price) return 0;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}

/* Card HTML usando imagem real do produto --------------- */
function productCardHTML(p) {
  const discount = calcDiscount(p);
  const badgeHtml = p.preorder
    ? `<span class="badge preorder">PRÉ-VENDA</span>`
    : p.badge
    ? `<span class="badge ${p.badge.toLowerCase()}">${p.badge}</span>`
    : discount > 0
    ? `<span class="badge">-${discount}%</span>`
    : "";

  const paymentLine = p.pixOnly
    ? `<span class="price-installment pix">à vista no PIX</span>`
    : "";

  return `
    <article class="product-card" data-id="${p.id}">
      <a href="produto.html?id=${p.id}" class="card-media">
        ${badgeHtml}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </a>
      <div class="card-body">
        <span class="card-cat">${CATEGORY_LABELS[p.category] || ""} • ${PLATFORM_LABELS[p.platform] || ""}</span>
        <a href="produto.html?id=${p.id}" class="card-title">${p.name}</a>
        <div class="card-price">
          ${p.oldPrice ? `<span class="price-old">${formatBRL(p.oldPrice)}</span>` : ""}
          <span class="price-now">${p.variants ? "A partir de " : ""}${formatBRL(p.price)}</span>
          ${paymentLine}
        </div>
      </div>
      <div class="card-actions">
        <a href="produto.html?id=${p.id}" class="btn btn-ghost">Detalhes</a>
        <button class="btn btn-primary js-add-cart" data-id="${p.id}">Comprar</button>
      </div>
    </article>
  `;
}
