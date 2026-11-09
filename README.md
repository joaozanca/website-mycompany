# ZancaVolt — Site institucional

Site da **ZancaVolt**, empresa de serviços elétricos, segurança eletrônica e ar comprimido que atende **São José dos Pinhais, Curitiba e Região Metropolitana (PR)**.

> Projeto em construção, desenvolvido em sprints com processo completo de QA.

## Tecnologias

- [Next.js](https://nextjs.org/) 16 com exportação estática (o build gera HTML puro na pasta `out/`)
- React 19, TypeScript e [Tailwind CSS](https://tailwindcss.com/) 4

## Como rodar no seu computador

Pré-requisito: [Node.js](https://nodejs.org/) 20.9 ou superior.

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre o site em modo desenvolvimento: http://localhost:3000
```

Para ver exatamente a versão que vai para o ar:

```bash
npm run build      # gera o site estático em out/
npm start          # serve a pasta out/ em http://localhost:3000
```

## Qualidade de código

```bash
npm run lint           # ESLint (regras do Next.js); reprova erros e avisos
npm run typecheck      # checagem de tipos do TypeScript
npm run format:check   # confere a formatação (Prettier)
npm run format         # corrige a formatação automaticamente
```

O `npm run build` também reprova erros de TypeScript.

### Testes automatizados

```bash
npm run test:e2e       # Playwright (pasta tests/); sobe o build local com npm start
```

Para rodar contra outro endereço (ex.: um preview), defina `BASE_URL`.

#### Regressão visual

Os testes de `tests/visual` comparam prints do site em 1280, 768 e 375 px com as referências de `tests/visual/referencias`. Eles rodam só na CI (Linux), porque cada sistema desenha as letras de um jeito.

Quando uma mudança visual for desejada, a CI fica vermelha e guarda as prints novas no artefato `referencias-visuais-novas`:

1. Confira as diferenças no artefato `relatorio-playwright`.
2. Baixe `referencias-visuais-novas` e substitua os arquivos de `tests/visual/referencias`.
3. Faça o commit no mesmo PR. A CI roda de novo com as referências aprovadas.

### Esteira de CI

Todo Pull Request para a `main` passa pelo GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)):

| Job | O que verifica |
|---|---|
| Lint, tipos, formatação e build | ESLint, TypeScript, Prettier, vulnerabilidades das dependências do site (`npm audit`) e build |
| Segredos no código (gitleaks) | Senhas, tokens e chaves esquecidos no código ou no histórico |
| Links quebrados | Links internos, imagens, âncoras e links externos do site gerado |
| Testes E2E (Playwright) | Os testes da pasta `tests/` |

### Publicação e preview por Pull Request (Netlify)

Cada PR ganha um site de teste publicado na Netlify, com o link no próprio PR (`deploy-preview-<número>--website-zancavolt.netlify.app`). É nele que o QA testa e contra ele rodam os testes E2E da CI. A configuração fica em [netlify.toml](netlify.toml).

O merge na `main` só é liberado com todos os jobs verdes. O Dependabot abre PRs de atualização de dependências toda segunda-feira.

#### Publicação no site (branch `producao`)

O site em [zancavolt.com.br](https://zancavolt.com.br) é publicado **só a partir da branch `producao`**, e não a cada merge na `main`. Cada publicação gasta créditos do plano grátis da Netlify (15 de 300 por mês); previews e a `main` não gastam (ZV-50).

| Branch | O que a Netlify faz |
|---|---|
| PR para `main` | Preview do PR (`deploy-preview-<número>--…`) |
| `main` | Site de homologação em `main--website-zancavolt.netlify.app` (não é o domínio) |
| `producao` | Publica em zancavolt.com.br e dispara o teste de fumaça em produção |

Para publicar (normalmente no fim da sprint, junto com a release):

1. Abra um PR da `main` para a `producao` (título: `release: vX.Y.Z`).
2. Espere a CI verde e confira o preview do PR.
3. Faça o merge com **Create a merge commit** (não use squash: a `producao` precisa ter os mesmos commits da `main`).
4. O workflow "Fumaça em produção" espera o commit entrar no ar e roda os testes de fumaça contra o domínio.

Numa urgência (ex.: telefone errado no site), corrija pela `main` como sempre e faça o mesmo PR para a `producao` logo em seguida.

### Padrão de commit

Os commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/) em português, com a chave do Jira como escopo:

```
tipo(ZV-n): descrição
```

Exemplos: `feat(ZV-13): envia o formulário para o WhatsApp`, `fix(ZV-12): corrige a tag original`. Tipos mais usados: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`.

O Husky (instalado pelo `npm install`) roda o commitlint a cada commit e bloqueia mensagens fora do padrão.

## Estrutura

```
src/
  app/               Página, layout (metadados/SEO) e estilos globais
  components/
    layout/          Header, footer, logo e botão flutuante do WhatsApp
    sections/        Seções da página (hero, serviços, projetos, contato…)
    ui/              Componentes visuais reutilizáveis (botões, títulos, ícones)
  config/site.ts     Dados da empresa: telefone, WhatsApp, e-mail, região, serviços
  lib/               Funções utilitárias
public/              Imagens, ícones e arquivos servidos como estão
tests/               Testes automatizados (E2E e acessibilidade)
docs/                Documentação do projeto e de QA
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores. O `.env` não é versionado.

## Histórico

A tag `v0.0.0-original` guarda o layout exatamente como foi exportado do v0, usada como referência de fidelidade visual.
