import { expect, test } from '@playwright/test'

// Teste de fumaça do site no ar (ZV-37): confere o básico logo depois de cada publicação da main.
// O que conferir veio dos critérios do card, definidos pelo QA; código escrito pelo Claude a pedido do QA.
// Também roda nos PRs, junto dos outros testes, contra o preview.

test('a página abre com o título da ZancaVolt', async ({ page }) => {
  const resposta = await page.goto('/')
  expect(resposta?.status()).toBe(200)
  await expect(page).toHaveTitle(/ZancaVolt/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('o botão flutuante e todos os links de WhatsApp usam o número da ZancaVolt', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Falar com a ZancaVolt no WhatsApp' })).toHaveAttribute(
    'href',
    /phone=5541987147142/,
  )

  const links = page.locator('a[href*="api.whatsapp.com"]')
  const total = await links.count()
  expect(total).toBeGreaterThan(0)
  for (let i = 0; i < total; i++) {
    await expect(links.nth(i)).toHaveAttribute('href', /phone=5541987147142/)
  }
})

test('o formulário vazio mostra os erros', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText('Informe o seu nome.')).toBeVisible()
  await expect(page.getByText('Informe um telefone ou WhatsApp para contato.')).toBeVisible()
  await expect(page.getByText('Informe a sua cidade.')).toBeVisible()
  await expect(page.getByText('Selecione o tipo de serviço.')).toBeVisible()
})
