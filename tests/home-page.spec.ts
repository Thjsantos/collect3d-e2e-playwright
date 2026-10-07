import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { prontaEntregaAsMap } from '../src/data/prontaEntregaProducts';

test.describe('Home page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('should open home page', async () => {
    expect(homePage.currentUrl()).toContain('collect3dstudio.com.br');
    expect((await homePage.title()).trim()).not.toBe('');
  });

  test('should display main menu items', async () => {
    for (const item of ['Início', 'Produtos a venda', 'Catálogo', 'Orçamentos', 'Contato']) {
      await expect(homePage.menuItem(item), `Menu item not visible: ${item}`).toBeVisible();
    }
  });

  const menuNavigation: Array<[string, string]> = [
    ['Produtos a venda', '/pronta-entrega/'],
    ['Catálogo sob encomenda', '/sob-encomenda/'],
    ['Orçamentos', '/como-comprar/'],
    ['Contato', '/contato/'],
  ];

  for (const [label, expectedPath] of menuNavigation) {
    test(`menu "${label}" navigates to ${expectedPath}`, async () => {
      await homePage.clickMenuItem(label, expectedPath);

      expect(homePage.currentUrl()).toContain(expectedPath);
    });
  }

  test('should return to home from Início menu item', async () => {
    await homePage.clickMenuItem('Contato', '/contato/');
    await homePage.clickMenuItem('Início', 'collect3dstudio.com.br');

    expect(homePage.currentUrl()).not.toContain('/contato/');
  });

  test('should show empty cart counter', async () => {
    await expect(homePage.cartAmount).toHaveText('0');
  });

  test('should open search input', async () => {
    await homePage.openSearch();

    await expect(homePage.searchInput).toBeVisible();
  });

  test('should search for term', async () => {
    await homePage.search('vincent');

    expect(homePage.currentUrl()).toContain('/search/');
    expect(homePage.currentUrl()).toContain('q=vincent');
  });

  test('should display header icons', async () => {
    await expect(homePage.searchIcon).toBeVisible();
    await expect(homePage.userIcon).toBeVisible();
    await expect(homePage.cartIcon).toBeVisible();
  });

  test('should display hero banner content', async () => {
    await expect(homePage.heroSlideImage).toBeVisible();
    await expect(homePage.carouselPrev).toBeVisible();
    await expect(homePage.carouselNext).toBeVisible();
  });

  test('should display WhatsApp button', async () => {
    await expect(homePage.whatsappButton).toBeVisible();
  });

  test('should open Pronta Entrega from Catálogo menu', async () => {
    const prontaEntregaPage = await homePage.goToProntaEntrega();

    expect(prontaEntregaPage.currentUrl().toLowerCase()).toContain('pronta-entrega');

    const products = await prontaEntregaPage.getProducts();
    products.forEach((price, name) => console.log(`${name} - ${price}`));

    expect([...products.entries()]).toEqual([...prontaEntregaAsMap().entries()]);
  });
});
