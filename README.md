# 🎭 Playwright Automation Portfolio

![Playwright Tests](https://github.com/danielitaigrosz/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)

Projeto de automação de testes E2E (end-to-end) construído com **Playwright + JavaScript**, utilizando o padrão **Page Object Model (POM)**. Criado como portfólio de estudos em QA/automação, aplicado sobre o site de testes público [SauceDemo](https://www.saucedemo.com/).

## 🧰 Tecnologias

- [Playwright](https://playwright.dev/) — framework de automação de testes E2E
- JavaScript (Node.js)
- Page Object Model (POM)
- GitHub Actions (CI)

## 📁 Estrutura do projeto

```
playwright-portfolio/
├── .github/workflows/
│   └── playwright.yml      # Pipeline de CI que roda os testes a cada push/PR
├── pages/                  # Page Objects (seletores e ações de cada tela)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   └── CheckoutPage.js
├── tests/                  # Especificações de teste
│   ├── login.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
├── utils/
│   └── users.js            # Massa de dados de usuários de teste
├── playwright.config.js    # Configuração do Playwright
└── package.json
```

## ✅ Cenários cobertos

- **Login**
  - Login com sucesso (usuário válido)
  - Login com credenciais inválidas
  - Login com usuário bloqueado (`locked_out_user`)
  - Validação de campos obrigatórios
- **Carrinho**
  - Adicionar 1 produto
  - Adicionar múltiplos produtos
  - Ordenação de produtos por preço
- **Checkout**
  - Fluxo completo de compra (login → adicionar produto → checkout → confirmação)

## ▶️ Como rodar o projeto localmente

Pré-requisitos: [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/playwright-portfolio.git
cd playwright-portfolio

# 2. Instale as dependências
npm install

# 3. Instale os navegadores usados pelo Playwright
npx playwright install

# 4. Rode os testes
npm test
```

### Outros comandos úteis

```bash
# Rodar com o navegador visível (modo headed)
npm run test:headed

# Rodar em modo UI (interface interativa do Playwright)
npm run test:ui

# Rodar apenas no Chromium
npm run test:chromium

# Rodar em modo debug (passo a passo)
npm run test:debug

# Ver o relatório HTML do último resultado
npm run report
```

## 🔄 Integração Contínua (CI)

Este projeto conta com um workflow do **GitHub Actions** (`.github/workflows/playwright.yml`) que roda automaticamente todos os testes a cada `push` ou `pull request` na branch `main`, publicando o relatório do Playwright como artefato do build.

## 📌 Sobre o site de testes

Os testes utilizam o [SauceDemo](https://www.saucedemo.com/), um site oficialmente mantido para prática de automação de testes, com usuários de teste pré-definidos (ex: `standard_user`, `locked_out_user`, `problem_user`), todos com a senha `secret_sauce`.

## 🙋 Sobre este projeto

Este repositório foi criado como parte dos meus estudos em automação de testes com Playwright. Sinta-se à vontade para explorar, sugerir melhorias ou usar como referência para seus próprios estudos.

## 🙋 Sobre mim

Meu nome é Daniel Itai Grosz, e estou estudando automação de testes com Playwright. Esse é um dos meus projetos de portfólio!

- 💼 [LinkedIn] -> https://www.linkedin.com/in/daniel-itai-grosz/
- 🐙 [GitHub](https://github.com/danielitaigrosz)
- ✉️ [Email] daniel.itaigrosz@gmail.com

---
Feito com 🎭 Playwright + JavaScript
