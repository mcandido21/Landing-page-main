# Guia de estrutura e funcionalidades

Este documento descreve como o portfólio está organizado e como suas partes se conectam. O [readme.md](./readme.md) contém as instruções rápidas de instalação e execução; este guia é voltado a quem vai entender ou manter o código.

## Visão geral

O projeto é uma aplicação de página única (SPA) construída com React. O Vite fornece o servidor de desenvolvimento e gera os arquivos estáticos para produção. Node.js é usado como ambiente de ferramentas; atualmente não há um servidor/API Node nem persistência de dados no backend.

```text
Landing-page-main/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── readme.md
├── README-ESTRUTURA.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets/
    │   └── images/
    │       ├── about.jpeg
    │       └── skills.jpeg
    ├── components/
    │   ├── LanguageSwitcher.jsx
    │   └── Navbar.jsx
    ├── context/
    │   └── LanguageContext.jsx
    ├── css/
    │   ├── about-details.css
    │   ├── professional-details.css
    │   └── style.css
    ├── hooks/
    │   └── useReveal.js
    ├── i18n/
    │   └── translations.js
    ├── pages/
        ├── AboutPage.jsx
        ├── HomePage.jsx
        ├── ProfessionalPage.jsx
        └── __tests__/
            ├── HomePage.test.jsx
            └── ProfessionalPage.test.jsx
    └── test/
        └── setup.js
```

`node_modules/` contém dependências instaladas e `dist/` é gerado pelo build. Ambos são ignorados pelo Git e não devem ser editados manualmente.

## Inicialização e configuração

### `index.html`

É o documento HTML de entrada do Vite. Define idioma inicial, viewport, metadados, título e folhas de estilo externas (Google Fonts, Font Awesome e Devicon). O elemento `#root` é o ponto onde React monta a aplicação; o módulo `/src/main.jsx` inicia essa montagem.

### `package.json` e `package-lock.json`

`package.json` declara dependências e comandos:

- `npm run dev`: inicia o servidor local do Vite.
- `npm run build`: compila a aplicação para `dist/`.
- `npm run preview`: serve localmente a compilação para conferência.
- `npm run lint`: verifica o código com ESLint.
- `npm test`: executa os testes uma vez com Vitest.
- `npm run test:watch`: inicia o Vitest em modo interativo.

`package-lock.json` registra as versões resolvidas das dependências para instalações reproduzíveis. Ao alterar dependências, atualize-o com o npm e mantenha os dois arquivos no controle de versão.

### `vite.config.js`

Configura o Vite e habilita o plugin React, necessário para transformar JSX e dar suporte à experiência de desenvolvimento com React.

### `src/main.jsx`

É o ponto de entrada JavaScript. Importa o CSS global e os estilos específicos das páginas de detalhes, cria a raiz React e envolve a aplicação com:

1. `React.StrictMode`, para verificações adicionais durante o desenvolvimento;
2. `BrowserRouter`, para navegação por URL sem recarregar a página;
3. `LanguageProvider`, que disponibiliza idioma e traduções para todos os componentes.

## Rotas e metadados

### `src/App.jsx`

Define as rotas com React Router:

| URL | Página | Responsabilidade |
| --- | --- | --- |
| `/` | `HomePage` | Apresentação, habilidades, projetos e contato |
| `/about` | `AboutPage` | Informações pessoais e interesses |
| `/professional` | `ProfessionalPage` | Trajetória profissional e tecnologias |
| Qualquer outra URL | Redirecionamento para `/` | Evita deixar uma rota desconhecida sem conteúdo |

O componente também atualiza o título do documento conforme a rota e atualiza o conteúdo da meta description usando a tradução selecionada.

Como a navegação usa `BrowserRouter`, o ambiente de produção deve encaminhar URLs desconhecidas ao `index.html` da SPA. Isso permite abrir ou atualizar diretamente `/about` e `/professional`.

## Páginas

### `src/pages/HomePage.jsx`

Monta a página principal e suas seções. Cada seção é um componente local ao arquivo:

- **Hero**: título, apresentação curta e link para a seção de contato.
- **About**: resumo pessoal e profissional; os botões navegam para `/about` e `/professional`.
- **Skills**: renderiza os cartões de tecnologias definidos no array `skills`.
- **Projects**: renderiza três cartões; os títulos e descrições são obtidos das chaves `projects.*` do arquivo de traduções.
- **Contact**: formulário com rótulos acessíveis, campos obrigatórios e validação nativa do navegador. Ao submeter dados válidos, mostra uma mensagem acessível explicando que o formulário é demonstrativo e que a mensagem não foi enviada.

Os cartões com classe `reveal` usam o hook `useReveal` para aparecer quando entram na área visível.

### `src/pages/AboutPage.jsx`

Página de detalhes pessoais. Carrega `about.jpeg` como asset processado pelo Vite, exibe os textos traduzidos e oferece links de retorno à página inicial.

### `src/pages/ProfessionalPage.jsx`

Página sobre trajetória e tecnologias. Carrega `skills.jpeg`, usa um array local `technologies` para renderizar os ícones e nomes e retorna à página inicial por meio do React Router.

**Limite atual do formulário:** a submissão não envia dados a um servidor ou serviço de e-mail. A interface informa explicitamente que não houve envio e recomenda os canais de contato já disponíveis na página. Para receber mensagens pelo formulário, será necessário implementar ou integrar uma API e validar os dados no servidor.

## Componentes compartilhados

### `src/components/Navbar.jsx`

Renderiza a barra de navegação usada na página inicial e nas páginas internas:

- Na página inicial, os links apontam para as âncoras `#home`, `#about`, `#skills`, `#projects` e `#contact`.
- Nas páginas internas, a propriedade `internal` substitui esses links por um link para `/`.
- Um listener de rolagem adiciona ou remove a classe `scrolled`, que altera a aparência da barra. O listener é removido quando o componente é desmontado.
- Inclui o seletor de idioma.

### `src/components/LanguageSwitcher.jsx`

Apresenta os botões PT, EN e ES. O idioma ativo é indicado por classe visual e pelo atributo acessível `aria-pressed`.

## Idiomas

### `src/i18n/translations.js`

Exporta:

- `LANGS`: metadados de cada idioma — rótulo, nome acessível e valor de `lang` do documento;
- `translations`: dicionários com textos identificados por chaves, como `hero.title`, `contact.email.label` e `details.about.p1`.

Os componentes não escolhem textos diretamente por idioma; eles solicitam uma chave pela função `t`. Para editar conteúdo traduzido, altere a mesma chave nos três dicionários. Para acrescentar um idioma, adicione seus metadados em `LANGS` e traduza as chaves correspondentes em `translations`.

O destaque no primeiro parágrafo profissional usa as chaves `details.prof.p1.before`, `details.prof.p1.highlight` e `details.prof.p1.after`. A marcação `<strong>` fica no JSX, não nos textos de tradução, evitando interpretar HTML vindo do dicionário.

### `src/context/LanguageContext.jsx`

Mantém o idioma selecionado no estado React e disponibiliza `language`, `setLanguage` e `t` pelo hook `useLanguage`.

Na inicialização, tenta usar o idioma salvo em `localStorage` (`portfolio-lang`); se não houver uma preferência válida, detecta o idioma do navegador e usa português como fallback. Ao trocar de idioma, atualiza o atributo `lang` do documento e tenta persistir a escolha. A falha de acesso ao armazenamento não impede a troca durante a sessão.

`useLanguage` lança um erro explícito se for chamado fora de `LanguageProvider`, ajudando a identificar uma composição incorreta dos componentes.

## Efeitos visuais e estilos

### `src/hooks/useReveal.js`

Hook React que localiza elementos `.reveal` quando a página inicial é montada e observa sua entrada na área visível com `IntersectionObserver`. Ao entrar, adiciona `.active` e deixa de observar aquele elemento. Se o navegador não oferecer `IntersectionObserver`, ativa os elementos imediatamente. O observador é desconectado no desmontar da página.

### `src/css/style.css`

Folha global da aplicação. Reúne reset, tipografia e container, navegação, hero, seções de conteúdo, cartões, formulário, links sociais, layout das páginas de detalhes, media queries, seletor de idioma, foco de teclado, animações e suporte a `prefers-reduced-motion`.

### Estilos específicos

- `src/css/about-details.css`: ajustes exclusivos do layout da página pessoal.
- `src/css/professional-details.css`: ajustes dos ícones e botão da página profissional.
Os estilos globais e os estilos das páginas de detalhes são importados em `src/main.jsx`.

### `src/assets/images/`

Contém as imagens usadas pelas páginas de detalhes. Elas são importadas pelos módulos React; assim, o Vite as inclui e gera os caminhos finais no build.

## Fluxos principais

### Navegação para detalhes

1. A pessoa seleciona um botão na seção “Sobre”.
2. `HomePage.jsx` chama `navigate('/about')` ou `navigate('/professional')`.
3. `App.jsx` renderiza a página correspondente sem recarregar o documento.

### Troca de idioma

1. `LanguageSwitcher.jsx` chama `setLanguage` ao selecionar um botão.
2. `LanguageContext.jsx` atualiza o estado global.
3. Os componentes que usam `t` renderizam novamente com os textos do idioma escolhido.
4. O contexto atualiza `document.documentElement.lang` e salva a preferência quando o armazenamento está disponível.

### Formulário de contato

1. O navegador valida campos `required` e o formato do e-mail.
2. Se a validação passar, `handleSubmit` impede o envio HTML padrão.
3. A página apresenta uma mensagem de status explicando que não houve envio.

Esse fluxo é somente de interface: os valores não são enviados nem armazenados. A mensagem não deve ser interpretada como confirmação de entrega.

## Orientações para manutenção

### Adicionar uma página

1. Crie o componente em `src/pages/`.
2. Registre a rota em `src/App.jsx`.
3. Se a página tiver título próprio, associe a URL à chave correspondente em `titleKeys`.
4. Se precisar de um link de navegação, atualize o componente apropriado.
5. Adicione e traduza as chaves de texto em `src/i18n/translations.js`.

### Alterar textos ou adicionar uma tradução

Localize a chave em `translations.js` e atualize-a nos idiomas suportados. Use `useLanguage` e `t('chave')` nos componentes, em vez de duplicar textos por idioma na interface.

### Alterar conteúdo de projetos ou habilidades

Os nomes dos cartões de habilidades estão no array `skills` em `HomePage.jsx`; os cartões de projeto são produzidos pelo array `projects` e pelas chaves `projects.N.title` / `projects.N.text` em cada dicionário.

### Executar e compilar

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

`npm run lint` executa ESLint. `npm test` executa os testes de formulário e da página profissional uma vez; `npm run test:watch` inicia o modo interativo do Vitest. O build verifica a compilação do JSX, a resolução dos módulos e a geração dos assets.
