import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProntaEntregaPage extends BasePage {
  private readonly items = this.page.locator('.item-description');

  constructor(page: Page) {
    super(page);
  }

  /** Products listed on the page as name -> price, in page order. */
  async getProducts(): Promise<Map<string, string>> {
    await this.items.first().waitFor();

    const products = new Map<string, string>();
    for (const item of await this.items.all()) {
      const name = (await item.locator('.js-item-name').innerText()).trim();
      const price = (await item.locator('.item-price').innerText()).trim();
      products.set(name, price);
    }
    return products;
  }
}
