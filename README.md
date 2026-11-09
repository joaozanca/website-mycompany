# ZancaVolt — Site institucional com processo completo de QA

[![CI](https://github.com/joaozanca/website-zancavolt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/joaozanca/website-zancavolt/actions/workflows/ci.yml)
[![Fumaça em produção](https://github.com/joaozanca/website-zancavolt/actions/workflows/fumaca.yml/badge.svg?branch=producao)](https://github.com/joaozanca/website-zancavolt/actions/workflows/fumaca.yml)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=joaozanca_website-mycompany&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=joaozanca_website-mycompany)

Site real da **ZancaVolt**, empresa de serviços elétricos, segurança eletrônica e ar comprimido de **São José dos Pinhais, Curitiba e Região Metropolitana (PR)**, no ar em **[zancavolt.com.br](https://zancavolt.com.br)**.

O projeto foi conduzido como um time de verdade, em **6 sprints com Scrum, Jira e Zephyr Scale**, e é o meu projeto de portfólio como **QA**: planejei e executei os testes, registrei bugs, aprovei ou reprovei cada entrega e defini os testes automatizados que protegem o site em todo Pull Request.

📄 **[Plano de Testes](docs/plano-de-testes.md)** · 📝 **[Estudo de caso](docs/estudo-de-caso.md)** · 🌐 **[Site no ar](https://zancavolt.com.br)** · 👤 **[João Vitor Zanca no LinkedIn](https://www.linkedin.com/in/joaovitorzanca-qa/)**

## Papéis

| Papel | Quem | O que fez |
|---|---|---|
| **QA** | [João Vitor Zanca](https://www.linkedin.com/in/joaovitorzanca-qa/) | Planejamento e estratégia de testes, casos e execuções no Zephyr, testes em aparelhos reais, bugs, regressão, aprovação de cada entrega e definição dos cenários automatizados |
| **PO / dono do site** | João Vitor Zanca | Prioridades, critérios de aceite e decisões de produto e de visual |
| **DEV** | IA (Claude) | Código do site e dos testes automatizados, escrito a pedido do QA, a partir dos cenários que ele definiu |

## O projeto em números

| | |
|---|---|
| Sprints | 6 (Sprint 0 a 5), de 15/10 a 16/11/2026 |
| Pull Requests | Mais de 40, todos com CI, preview e aprovação do QA |
| Testes automatizados | **23 em todo PR** (4 E2E, 8 de acessibilidade, 3 de fumaça e 8 de regressão visual) + 3 de fumaça contra o site no ar a cada publicação |
| Casos de teste manuais | **96** no Zephyr Scale (ZV-T1 a ZV-T96), em 6 ciclos (um por sprint) |
| Bugs registrados | 4 no Jira, todos com decisão registrada; outros achados corrigidos no próprio card |
| Performance no celular | Lighthouse **93** (era 75) |
| Segurança | Nota **A+** no securityheaders.com |

## Destaques de QA

- **A regressão visual automática pegou a mudança certa:** na troca de fotos do portfólio, o teste apontou exatamente os 5 cartões alterados, e as referências só foram aprovadas depois da conferência do Diff.
- **Um teste que deixava passar defeito foi corrigido:** com tolerância de 0,1%, a logo com o Z em azul passava no teste visual; a tolerância virou no máximo 50 pixels.
- **Aparelho real achou o que o simulador não mostra:** o selo da hospedagem cobria o botão do WhatsApp no celular, e o Samsung Internet escurecia o site no modo escuro.
- **Acessibilidade automática achou problema real:** o axe mostrou o botão flutuante fora das regiões da página para leitores de tela.
- **Teste instável investigado antes de ser mexido:** 20 execuções seguidas mostraram que a falha era da hospedagem, não do site nem do teste.
- **Bug tratado na causa:** o build que falhava ao baixar a fonte do Google passou a usar fontes guardadas no próprio site.

## Como o trabalho foi organizado

- **Jira:** sprints de uma semana, cards com critérios de aceite, bugs vinculados e revisão no fim de cada sprint.
- **Zephyr Scale:** casos de teste por card, um ciclo por sprint, execuções com evidências e reteste dos bugs.
- **GitHub:** cada card em uma branch e um Pull Request com a CI verde; merge só depois da aprovação do QA.
- **Ambientes:** preview por PR (onde o QA testa), homologação da `main` e produção publicada por release.

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
tests/               Testes automatizados (E2E, acessibilidade, fumaça e regressão visual)
docs/                Plano de Testes e design system
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores. O `.env` não é versionado.

## Histórico

A tag `v0.0.0-original` guarda o layout exatamente como foi exportado do v0, usada como referência de fidelidade visual.
