import { expect, test, type Page } from '@playwright/test'

// Regressão visual automática (ZV-48): compara prints do site com as referências aprovadas em
// tests/visual/referencias. Telas definidas pelo QA; código escrito pelo Claude a pedido do QA.
// Cada sistema desenha as letras de um jeito, e as referências são geradas no Linux da CI.
test.skip(process.platform !== 'linux', 'As referências valem só no Linux da CI.')

const telas = [
  { nome: 'desktop', width: 1280, height: 800 },
  { nome: 'tablet', width: 768, height: 1024 },
  { nome: 'celular', width: 375, height: 812 },
]

// Até 0,1% dos pixels pode mudar por pequenas variações de desenho.
const opcoes = { animations: 'disabled', maxDiffPixelRatio: 0.001 } as const

async function esconderHospedagem(page: Page) {
  // Barra do preview e selo "Powered by Netlify": vêm da hospedagem e não fazem parte do site.
  await page.addStyleTag({ content: '[data-netlify-deploy-id], iframe { display: none !important; }' })
}

async function carregarImagens(page: Page) {
  // As imagens dos projetos só carregam quando aparecem na tela: rola até o fim e espera todas.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    await Promise.all(Array.from(document.images).map((imagem) => imagem.decode().catch(() => undefined)))
    window.scrollTo(0, 0)
  })
}

for (const tela of telas) {
  test.describe(`regressão visual no ${tela.nome} (${tela.width}px)`, () => {
    test.use({ viewport: { width: tela.width, height: tela.height } })

    test('página inicial inteira', async ({ page }) => {
      await page.goto('/')
      await esconderHospedagem(page)
      await carregarImagens(page)
      await expect(page).toHaveScreenshot(`pagina-inicial-${tela.nome}.png`, { ...opcoes, fullPage: true })
    })

    test('página 404', async ({ page }) => {
      await page.goto('/endereco-que-nao-existe')
      await esconderHospedagem(page)
      await expect(page).toHaveScreenshot(`pagina-404-${tela.nome}.png`, opcoes)
    })

    // O menu ☰ só existe abaixo de 1024px (no desktop os links ficam no topo).
    if (tela.width < 1024) {
      test('menu aberto', async ({ page }) => {
        await page.goto('/')
        await esconderHospedagem(page)
        await page.getByRole('button', { name: 'Abrir menu' }).click()
        await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toBeVisible()
        await expect(page).toHaveScreenshot(`menu-aberto-${tela.nome}.png`, opcoes)
      })
    }
  })
}
