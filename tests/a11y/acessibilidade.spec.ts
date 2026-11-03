import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Testes de acessibilidade automáticos com axe (ZV-38). Cenários definidos pelo QA;
// código escrito pelo Claude a pedido do QA.
// Regras: WCAG 2.0, 2.1 e 2.2 níveis A e AA, mais as boas práticas do axe.
const regras = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

const telas = [
  { nome: 'desktop', width: 1280, height: 800 },
  { nome: 'tablet', width: 768, height: 1024 },
  { nome: 'celular', width: 375, height: 812 },
]

async function analisar(page: Page) {
  const resultado = await new AxeBuilder({ page })
    .withTags(regras)
    // A barra da Netlify ("Collaborate / Log in") e o selo "Powered by Netlify" são injetados pela
    // hospedagem, não fazem parte do site e ficam dentro de iframes ou do bloco data-netlify-deploy-id.
    .exclude('[data-netlify-deploy-id]')
    .exclude('iframe')
    .analyze()

  // Lista legível no relatório quando falhar: regra, impacto e onde aconteceu.
  const problemas = resultado.violations.map((v) => ({
    regra: v.id,
    impacto: v.impact,
    descricao: v.help,
    onde: v.nodes.map((n) => n.target.join(' ')),
  }))
  expect(problemas).toEqual([])
}

for (const tela of telas) {
  test.describe(`acessibilidade no ${tela.nome} (${tela.width}px)`, () => {
    test.use({ viewport: { width: tela.width, height: tela.height } })

    test('a página carregada não tem problemas de acessibilidade', async ({ page }) => {
      await page.goto('/')
      await analisar(page)
    })

    test('o formulário com os erros à mostra não tem problemas de acessibilidade', async ({ page }) => {
      await page.goto('/')
      await page.getByRole('button', { name: 'Enviar' }).click()
      await expect(page.getByText('Informe o seu nome.')).toBeVisible()
      await analisar(page)
    })

    // O menu ☰ só existe abaixo de 1024px (no desktop os links ficam no topo).
    if (tela.width < 1024) {
      test('o menu aberto não tem problemas de acessibilidade', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: 'Abrir menu' }).click()
        await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toBeVisible()
        await analisar(page)
      })
    }
  })
}
