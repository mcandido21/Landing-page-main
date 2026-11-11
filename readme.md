# Portfólio — Mário Cândido

Portfólio responsivo feito com React, Vite e CSS. O Node.js é usado para instalar dependências, executar o servidor de desenvolvimento e gerar o build.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run lint
npm test
npm run build
npm run preview
```

## Páginas

- `/` — página principal, projetos e contato
- `/about` — informações pessoais
- `/professional` — trajetória e tecnologias

O idioma pode ser alternado entre português, inglês e espanhol; a preferência fica salva no navegador.

## Formulário

O formulário valida os campos no navegador, mas ainda não envia dados para um servidor ou serviço de e-mail. Após a submissão, informa claramente que é demonstrativo e que a mensagem não foi enviada. Para envio real, conecte-o a uma API e valide os dados também no backend.

## Estrutura

```text
Landing-page-main/
├── index.html
├── eslint.config.js
├── package.json
├── readme.md
├── README-ESTRUTURA.md
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets/
    │   └── images/
    ├── components/
    ├── context/
    ├── css/
    ├── hooks/
    ├── i18n/
    ├── pages/
    │   └── __tests__/
    │       ├── HomePage.test.jsx
    │       └── ProfessionalPage.test.jsx
    └── test/
        └── setup.js
```
