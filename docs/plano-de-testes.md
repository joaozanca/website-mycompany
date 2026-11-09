# Plano de Testes — Site da ZancaVolt

Versão 2.0 · 09/11/2026 · Card ZV-52 (versão 1.0: 30/10/2026, card ZV-25)

Este plano descreve como o site da ZancaVolt é testado: o que entra no teste, onde, com quais ferramentas e quando uma entrega pode ser considerada pronta. Ele registra o que o time fez da Sprint 0 à Sprint 5, com exemplos reais do projeto.

## 1. Escopo

**Testado:**

- O site institucional (página única): topo, faixa de diferenciais, Serviços, Sobre, Como trabalhamos, Projetos, faixa de chamada, Contato e rodapé, além da página 404.
- O formulário de orçamento e todos os links de contato (WhatsApp, telefone, e-mail e redes sociais).
- Aparência em celular, tablet e desktop, inclusive em aparelhos reais.
- Acessibilidade (WCAG 2.2 nível AA): contraste, foco no teclado, ordem dos títulos, regiões da página e nomes acessíveis.
- Performance no celular (Lighthouse), cabeçalhos de segurança HTTP e SEO (metatags, sitemap, robots.txt e dados estruturados).
- O site no ar: publicação, teste de fumaça depois de cada publicação e monitoramento.
- A esteira do repositório: proteção das branches, checks do Pull Request, Dependabot, previews, homologação e publicação.

**Fora do escopo:**

- Testes de carga e de estresse (site estático, sem servidor próprio).
- Testes de invasão (pentest); a segurança fica na esteira (gitleaks, npm audit, SonarCloud) e nos cabeçalhos HTTP.
- Navegadores fora do Chromium (Chrome e Brave), do Safari do iPhone e do Samsung Internet.
- O WhatsApp em si: o teste confere o link e a mensagem que o site monta, não o funcionamento do aplicativo.

## 2. Ambientes

| Ambiente | Endereço | Uso |
|---|---|---|
| **Local** | `http://localhost:3000` (`npm run build` e `npm start`) | Desenvolvimento e conferências rápidas do DEV |
| **Preview do PR** | `https://deploy-preview-N--website-zancavolt.netlify.app` | **Ambiente oficial de teste do QA.** Criado pela Netlify em todo Pull Request; os testes automáticos da CI rodam contra ele |
| **Homologação** | `https://main--website-zancavolt.netlify.app` | A `main` atual, já com tudo o que foi aprovado; referência nas regressões (desde a ZV-50). Não é indexada pelo Google |
| **Produção** | `https://zancavolt.com.br` | Site no ar. Publicado só a partir da branch `producao`, normalmente uma vez por sprint (ZV-50) |

As regras são: **o QA testa no preview do PR, antes do merge**; o que vai para a `main` já foi testado; o que vai para a produção já passou pela homologação.

Os previews e a homologação pedem aos buscadores para não indexar (`noindex` e `robots.txt` com `Disallow`); só a produção aparece no Google.

## 3. Tipos de teste e ferramentas

| Tipo | O que confere | Ferramenta | Exemplo real |
|---|---|---|---|
| Funcional (manual) | O comportamento contra os critérios de aceite | Navegador + Zephyr Scale | Formulário de orçamento (ZV-15) |
| Teste negativo e validação de campos | Entradas que devem ser recusadas | Navegador e Playwright | Campo só com espaços, e-mail "joao@", formulário vazio (ZV-15, ZV-24) |
| Regressão visual automática | O visual não mudou sem querer | Playwright (`tests/visual/`), 8 prints comparadas com referências aprovadas | Pegou a troca de fotos da ZV-45 e só ela; vista falhando com o Z da logo em azul (ZV-48) |
| Regressão visual manual | Interações e partes que a print não cobre | Preview × homologação, lado a lado (ZV-T2) | Achou a mudança de fonte na faixa de diferenciais (ZV-26) |
| Regressão de dependências | Atualizações de bibliotecas não mudam o site | Preview × homologação (ZV-T36) + CI | PRs do Dependabot (ZV-13, ZV-41, ZV-51) |
| Automação E2E | Fluxos de contato em todo PR | Playwright (`tests/e2e/`) | Número do WhatsApp, dados antigos, emoji na mensagem e formulário vazio (ZV-24) |
| Acessibilidade automática | Regras WCAG 2.0, 2.1 e 2.2 (A e AA) e boas práticas | axe (`tests/a11y/`) em 1280, 768 e 375 | Achou o botão flutuante fora das regiões da página (ZV-38) |
| Acessibilidade manual | Contraste, foco no teclado e ordem dos títulos | Lighthouse, WebAIM Contrast Checker, tecla Tab | ZV-21 e ZV-26 |
| Responsividade | Layout em celular, tablet e desktop | DevTools (375 × 812, 768 × 1024 e tela cheia) | Todas as entregas visuais |
| Aparelho real | O que o simulador não mostra | iPhone, dois celulares Samsung (Samsung Internet e Chrome) | Selo da Netlify sobre o botão e modo escuro do Samsung (ZV-40) |
| Ponta a ponta com serviço externo | O contato chega à empresa | WhatsApp real, com dados fictícios | ZV-14 e ZV-46 |
| Performance | Velocidade no celular | Lighthouse (modo celular) | De 75 para 93 com imagens WebP (ZV-35) |
| Segurança HTTP | Cabeçalhos de segurança | securityheaders.com e DevTools | Nota A+ (ZV-36) |
| SEO | Metatags, sitemap, robots.txt, canônico e dados estruturados | Ctrl + U, Teste de pesquisa aprimorada do Google, Search Console | ZV-34; homologação sem indexação (ZV-50) |
| Fumaça em produção | O site no ar abre e o contato funciona depois de cada publicação | Playwright (`tests/smoke/`) contra o domínio | ZV-37 |
| Monitoramento | O site continua no ar | UptimeRobot a cada 5 minutos, alerta por e-mail | Queda simulada (ZV-37) |
| Análise estática e segurança do código | Qualidade, segredos e vulnerabilidades | ESLint, TypeScript, SonarCloud, gitleaks, npm audit | Checks automáticos do PR |

## 4. Automação

**23 testes rodam em todo Pull Request** no check "Testes E2E (Playwright)", contra o preview daquele PR:

| Pasta | Testes | O que cobrem |
|---|---|---|
| `tests/e2e/` | 4 | Fluxos de contato: número do WhatsApp, dados antigos, mensagem com emoji e formulário vazio |
| `tests/a11y/` | 8 | axe na página, no formulário com erros e no menu aberto, em 1280, 768 e 375 |
| `tests/smoke/` | 3 | A página abre, os links de WhatsApp estão certos e o formulário vazio mostra os erros |
| `tests/visual/` | 8 | Página inicial, página 404 e menu aberto em desktop, tablet e celular (só na CI, em Linux) |

Além disso, os **3 testes de fumaça** rodam contra `https://zancavolt.com.br` depois de cada publicação, e o commit publicado fica com o check vermelho se algo falhar.

Regras:

- **Todo teste novo é visto falhando pelo menos uma vez** antes de entrar no projeto. Teste que nunca falhou pode estar sempre verde sem testar nada.
- O QA define os cenários. O código pode ser escrito pelo QA ou pelo DEV/IA a pedido do QA, e isso fica registrado no commit e no PR.
- Bug corrigido que pode voltar ganha um teste automático. Exemplo: o emoji quebrado no WhatsApp (ZV-23) é conferido por um teste E2E.
- Mudança visual desejada: a CI fica vermelha, o QA confere o Diff no relatório e aprova as referências novas no mesmo PR (passo a passo no README).
- Teste instável é investigado antes de ser ajustado: a falha da ZV-47 era um erro passageiro da hospedagem, confirmado com 20 execuções seguidas sem falha.
- Rodar no computador: `npm run test:e2e` (o Playwright liga o site sozinho em `localhost:3000`). A regressão visual roda só na CI.

## 5. Estratégia de regressão

Antes de cada entrega, a pergunta é: **"o que esta mudança pode ter quebrado?"**

| A entrega… | Regressão |
|---|---|
| Muda o que o visitante vê (cores, textos, imagens, layout) | Regressão visual automática no PR + **ZV-T2** (preview × homologação em desktop, 768 e 375, com o menu ☰) quando a mudança mexe em interações |
| Atualiza bibliotecas do site (PR do Dependabot de produção) | **ZV-T36:** preview × homologação, com atenção aos ícones e ao CSS |
| Atualiza só ferramentas de desenvolvimento | A CI completa, incluindo a regressão visual automática |
| Mexe só em testes, documentação ou configuração | Sem regressão manual; os testes automáticos cobrem os fluxos principais |

Em todos os casos, os **23 testes automáticos** rodam sozinhos no PR.

Dicas que evitam falsos alarmes: a diferença que aparece igual nos dois lados não é regressão; um destaque num lado só costuma ser o mouse em cima (hover); confira o zoom do navegador (Ctrl + 0) e recarregue com Ctrl + F5 depois de uma publicação, para não ver uma cópia antiga da página.

## 6. Critérios de entrada (quando um card vai para teste)

- O card tem **critérios de aceite** escritos no Jira (todo card nasce com critérios).
- O PR está aberto com a descrição completa e o checklist do DEV marcado.
- Os checks da CI estão **verdes** e o preview está no ar (ou a CI está vermelha só pela regressão visual de uma mudança visual esperada).
- O card está na coluna **Aguardando teste**.

## 7. Critérios de saída

**Card pronto (Feito):**

- Todos os critérios de aceite testados no preview, com os casos e as execuções registrados no **Zephyr Scale**, no ciclo da sprint.
- Regressão feita quando a entrega pede (seção 5).
- Nenhum bug aberto que bloqueie o card; bugs menores podem ficar no backlog com decisão registrada.
- Aprovação do QA registrada como comentário no card.
- **Squash merge** na `main` com o título completo terminando em `(#N)`.

**Publicação (release):**

- Cards da sprint em Feito e homologação conferida.
- PR da `main` para a `producao`, com CI verde, e merge commit.
- Teste de fumaça em produção verde e conferência do site no domínio.
- Tag e release no GitHub com o que entrou.

Caso que não pode ser executado por limitação do ambiente fica **Bloqueado**, com o motivo e a data prevista (exemplo: a publicação da ZV-50, que dependia dos créditos da Netlify).

## 8. Fluxo de bugs

1. **Confirmar antes de registrar:** o problema se repete? Não é ambiente (zoom, cache, extensão, bloqueador do navegador)? Comparar com a homologação ou com a versão original mostra se ele já existia.
2. **Registrar no Jira:** resumo claro, ambiente, passos para reproduzir, resultado atual, resultado esperado, evidências e vínculo com o card ("bloqueia" ou "relacionado a").
3. **Prioridade** pelo impacto para o cliente: o formulário que não envia é crítico; um detalhe visual é baixo.
4. **Correção** pelo DEV, de preferência no mesmo PR quando o bug foi achado no teste daquela entrega.
5. **Reteste:** nova execução do mesmo caso no Zephyr ("Iniciar novo teste"). A execução com falha fica no histórico.
6. Defeito pequeno achado no teste da própria entrega pode ser corrigido no mesmo PR ou num PR do mesmo card sem abrir bug, **por decisão do QA**, desde que fique registrado na execução (exemplos: a fonte da faixa de diferenciais na ZV-26 e a homologação sem `noindex` na ZV-50).

## 9. Evidências

- Cada passo executado tem um print que prova o resultado, anexado no passo do Zephyr.
- A evidência mostra **a entrada e a saída** (por exemplo, o formulário preenchido e a mensagem que chegou).
- **Sem dados pessoais:** nada de conversas, contatos ou dados reais de terceiros nos prints; usar dados fictícios ("João Silva", "(41) 99999-9999") e recortar quando necessário (LGPD). Fotos de clientes só com autorização e sem nomes, placas ou pessoas identificáveis.
- Quando o print não mostra tudo, o resultado real descreve o que foi visto e por quê; conferências feitas pelo DEV no terminal ficam identificadas como tal.
- Quem executou fica registrado no comentário da execução.
- Os casos, execuções e prints também ficam guardados fora do Zephyr, para não depender da ferramenta (ZV-55).

## 10. Ferramentas

| Ferramenta | Uso |
|---|---|
| Jira | Sprints, cards, critérios de aceite e bugs |
| Zephyr Scale | Casos de teste, ciclos por sprint, execuções e rastreabilidade com os cards |
| GitHub | Branches, Pull Requests, rulesets da `main` e da `producao`, tags e releases |
| GitHub Actions | CI (lint, tipos, formatação, build, gitleaks, links quebrados e testes) e fumaça em produção |
| SonarCloud | Qualidade e segurança do código |
| Netlify | Hospedagem: produção, homologação da `main` e preview de cada Pull Request |
| Playwright | Testes E2E, de fumaça e de regressão visual |
| axe (@axe-core/playwright) | Acessibilidade automática |
| UptimeRobot | Monitoramento do site no ar |
| DevTools, Lighthouse e WebAIM | Responsividade, performance, acessibilidade e contraste |
| securityheaders.com | Cabeçalhos de segurança |
| Google Search Console e Teste de pesquisa aprimorada | Indexação e dados estruturados |

## 11. Papéis

| Papel | Responsabilidade |
|---|---|
| **PO / dono do site** | Define o que entra, aprova decisões de produto e de visual |
| **QA** | Participa da Planning, define o que testar, executa, julga, registra e aprova ou reprova a entrega |
| **DEV** | Implementa, faz a conferência básica antes do PR e corrige os bugs |

A aprovação de uma entrega é sempre do QA. Neste projeto, o DEV é uma IA (Claude), que também escreveu o código dos testes automatizados a pedido do QA, a partir dos cenários definidos por ele.

## 12. Números do projeto (até a Sprint 5)

- **6 sprints** (Sprint 0 a Sprint 5), de 15/10 a 16/11/2026.
- **23 testes automatizados** em todo PR e **3 de fumaça** em produção a cada publicação.
- **96 casos de teste manuais** no Zephyr (ZV-T1 a ZV-T96), organizados em ciclos por sprint (ZV-R1 a ZV-R6).
- **4 bugs registrados no Jira:** ZV-12 (tag original), ZV-21 (contraste), ZV-23 (emoji no WhatsApp) e ZV-42 (build ao baixar a fonte). Outros achados foram corrigidos no próprio card, com registro na execução.
- Lighthouse no celular: Performance **93**; securityheaders.com: **A+**.

## 13. Riscos conhecidos

- A automação cobre os fluxos de contato, a acessibilidade e o visual da página inicial, da 404 e do menu; o resto depende de teste manual.
- O plano grátis da Netlify tem 300 créditos por mês (15 por publicação). Por isso a produção é publicada por release, e uma correção urgente gasta créditos.
- O preview e a homologação mostram uma barra própria da Netlify ("Collaborate") e a produção mostra o selo "Powered by Netlify"; os dois podem cobrir conteúdo nos prints.
- No Samsung Internet com o modo escuro ligado, o navegador escurece o site por conta própria (limitação do navegador).
- O Instagram fica fora da checagem automática de links, porque bloqueia robôs (erro 429).
- Erros passageiros da hospedagem podem derrubar um teste uma vez; a CI repete o teste uma vez antes de reprovar.
