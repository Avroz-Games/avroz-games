# AVROZ RETROGAMES — Loja Oficial Neo Geo AES+

Loja de e-commerce dedicada à linha **Neo Geo AES+**, com produtos oficiais
importados de [Ultra Arcade Shop](https://shop.ultraarcadebh.com.br/) e
cartuchos avulsos dos 10 clássicos da SNK.

### Consoles (3 edições independentes)
1. **Neo Geo AES+ Original** — R$ 3.200,00 — edição preta, porta de entrada
2. **Neo Geo AES+ Anniversary** — R$ 4.200,00 — edição branca comemorativa com joystick sem fio, Memory Card e cartucho Metal Slug
3. **Neo Geo AES+ Ultimate** — R$ 6.499,99 — edição premium numerada com 3 controles, Memory Card e 10 cartuchos

### Acessórios
4. **Arcade Stick Neo Geo AES+** — com fio (preto) e sem fio (branco)
5. **Gamepad Wireless Neo Geo AES+** — controle sem fio preto
6. **Memory Card Neo Geo AES+** — preto ou branco

### Cartuchos Neo Geo AES+ (R$ 999 cada)
1. Metal Slug (1996)
2. The King of Fighters 2002 (2002)
3. Garou: Mark of the Wolves (1999)
4. Big Tournament Golf / Neo Turf Masters (1996)
5. Shock Troopers (1997)
6. Samurai Shodown V Special (2004)
7. Pulstar (1995)
8. Twinkle Star Sprites (1996)
9. Magician Lord (1990)
10. Over Top (1996)

É um projeto **front-end estático** (HTML + CSS + JavaScript puro) hospedado no GitHub Pages.
O carrinho é persistido no `localStorage` do navegador e os pedidos podem ser gravados no Supabase
quando as credenciais públicas forem configuradas em `js/supabase-config.js`.

---

## Como executar

### Opção 1 — Abrir direto no navegador
Basta abrir o arquivo `index.html` no navegador (duplo clique).

### Opção 2 — Servidor local (recomendado)
Para que as imagens e scripts funcionem corretamente, rode um servidor local:

```bash
# Python 3
python -m http.server 8000

# Node (com npx)
npx serve .

# VS Code / Cursor
# Instale a extensão "Live Server" e clique em "Go Live"
```

Depois acesse http://localhost:8000 no navegador.

---

## Publicação no GitHub Pages

O projeto já inclui o workflow `.github/workflows/pages.yml` para publicar o site estático pelo GitHub Pages.

1. Envie o repositório para o GitHub na branch `main`.
2. No GitHub, abra `Settings` > `Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions`.
4. Faça um push para `main` ou execute o workflow `Deploy GitHub Pages` manualmente em `Actions`.
5. Após o deploy, a URL pública aparecerá no resumo do workflow e em `Settings` > `Pages`.

Como o site é HTML, CSS e JavaScript puro, não há etapa de build.

---

## Banco de Dados Supabase

O carrinho salva o pedido no Supabase antes de abrir o WhatsApp quando `js/supabase-config.js` estiver configurado.

1. Crie um projeto no Supabase.
2. Abra `SQL Editor` e execute o script `supabase/orders.sql`.
3. Execute também `supabase/admin-read-policy.sql`.
4. Execute o script `supabase/visits.sql` para criar o contador administrativo e público.
5. O e-mail administrador já está definido nos scripts como `caetano.james@gmail.com`.

```sql
insert into public.admin_users (email)
values ('caetano.james@gmail.com')
on conflict (email) do nothing;
```

1. Em `Authentication` > `Providers`, mantenha `Email` habilitado.
2. Em `Authentication` > `URL Configuration`, adicione a URL publicada em `Site URL` e `Redirect URLs`.

Para acessar as vendas e o contador de visitas, abra `vendas.html`, informe o e-mail administrador e use o link recebido por e-mail.

---

## Configuração das Credenciais Supabase

1. No Supabase, acesse `Project Settings` > `API`.
2. Copie a `Project URL` e a chave `anon public`/`publishable`.
3. Atualize `js/supabase-config.js`.

```js
window.SUPABASE_CONFIG = {
  url: "https://SEU-PROJETO.supabase.co",
  anonKey: "SUA_CHAVE_ANON_PUBLIC",
  ordersTable: "orders",
  visitsTable: "site_visits",
};
```

Se o Supabase não estiver configurado ou ficar indisponível, o pedido ainda segue pelo WhatsApp, mas não é gravado no banco.

---

## Estrutura do projeto

```text
AVROZ RETROGAMES/
├── index.html          → Home com hero, linha Neo Geo AES+, FAQ
├── produtos.html       → Catálogo com filtros e ordenação
├── produto.html        → Página de produto individual (com galeria)
├── carrinho.html       → Carrinho de compras com resumo
├── vendas.html         → Área administrativa de vendas e visitas
├── contato.html        → Formulário de contato
├── img/                → Imagens oficiais dos produtos (PNG/WEBP)
├── supabase/
│   ├── orders.sql      → Script da tabela de pedidos
│   ├── visits.sql      → Script da tabela do contador de visitas
│   └── admin-read-policy.sql → Política de leitura administrativa
├── css/
│   └── style.css       → Tema neon (dark mode, responsivo)
└── js/
    ├── products.js     → Base de produtos e helpers (formatBRL, cards)
    ├── main.js         → Header, menu mobile, carrinho global, toast
    ├── supabase-config.js → Configuração pública do Supabase
    ├── admin.js        → Consulta administrativa de vendas e visitas
    ├── visits.js       → Registro de visitas no Supabase
    ├── catalog.js      → Filtros, ordenação e busca do catálogo
    ├── product.js      → Página de produto (galeria, variantes)
    └── cart.js         → Carrinho (itens, cadastro, Supabase, cupom, checkout)
```

---

## Funcionalidades

- **Home** com hero, linha completa Neo Geo AES+, banners, FAQ, newsletter
- **Catálogo** com:
  - Filtro por categoria (consoles, jogos, controles, acessórios)
  - Faixa de preço (min/max)
  - Ordenação (relevância, preço, nome, desconto)
  - Busca textual via `?q=`
- **Produto individual** com:
  - Galeria de múltiplas imagens com thumbs
  - Seletor de variantes (Original / Anniversary / Ultimate) com atualização de preço
  - Descrição rica em HTML
- **Carrinho** com:
  - Persistência no `localStorage` (sobrevive ao refresh)
  - Alteração de quantidade e remoção
  - Cadastro obrigatório com dados de contato e endereço
  - Gravação de pedidos no Supabase
  - Frete a calcular após confirmação do endereço
  - Cupom PIX exclusivo (não divulgado na página)
- **Área de vendas** em `vendas.html` com login por e-mail via Supabase Auth
- **Contador público de visitas** exibido no site
- **Contador administrativo de visitas** com detalhes no painel restrito
- **Responsivo** (desktop, tablet, mobile)
- **Tema escuro neon** inspirado em fliperamas

### Cupom ativo
| Código    | Desconto | Condição                        |
|-----------|----------|---------------------------------|
| `MAD2026` | 5%       | Válido somente no pagamento PIX |

> O cupom não é divulgado nas páginas do site. Sem cupom, o valor cobrado é exatamente o mesmo do anúncio.

---

## Como adicionar/editar produtos

Edite o array `PRODUCTS` em `js/products.js`. Cada produto tem o formato:

```js
{
  id: "neo-geo-aes-plus-original",    // ID único (usado na URL)
  name: "Neo Geo AES+ Original",
  category: "consoles",               // consoles | jogos | controles | acessorios
  platform: "neogeo",
  price: 3200.0,
  oldPrice: null,                     // opcional, para mostrar preço riscado
  image: "img/NEOGEO_Product.png",    // imagem principal (card e capa)
  gallery: [                          // imagens da galeria do produto
    "img/NEOGEO_Product.png",
    "img/neogeo12.webp",
    // ...
  ],
  description: "O Neo Geo AES+ marca o retorno...",
  longDescription: "<h3>...</h3>",    // opcional, HTML livre
  badge: "TOP",                       // opcional: TOP | NEW
  preorder: true,                     // mostra badge PRÉ-VENDA
  stock: 8,
  featured: true,                     // aparece em "Destaques"
  variants: [                         // opcional: variações com preços
    { id: "original", label: "Original", price: 3200.0 },
    { id: "anniversary", label: "Anniversary", price: 4200.0 },
    { id: "ultimate", label: "Ultimate", price: 6499.99 }
  ],
  meta: { "Marca": "Ultra Arcade / SNK", /* ... */ }
}
```

---

## Tecnologias usadas

- **HTML5 semântico**
- **CSS3** com custom properties, grid, flexbox, animações
- **JavaScript vanilla (ES6+)** — sem frameworks nem dependências
- **Google Fonts**: Press Start 2P + Rajdhani

---

## Próximos passos sugeridos

1. Integrar gateway de pagamento (Mercado Pago, Pagar.me, Stripe, PayPal)
2. Adicionar login/cadastro de usuários
3. Criar painel admin para gerenciar produtos e pedidos
4. Integrar Correios para cálculo real de frete por CEP

---

Fontes dos produtos e imagens: [Ultra Arcade Shop — Neo Geo AES+](https://shop.ultraarcadebh.com.br/search?q=neo+geo)

© 2026 AVROZ RETROGAMES
