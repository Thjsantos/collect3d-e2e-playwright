import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProntaEntregaPage } from './ProntaEntregaPage';

export class HomePage extends BasePage {
  private readonly prontaEntregaLink = this.page.getByRole('link', { name: 'Produtos a venda' }).first();

  // Locators taken from the site's HTML (Nuvemshop "Rio" theme, Swiper carousel).
  readonly searchIcon = this.page.locator('header a.js-search-button');
  readonly userIcon = this.page.locator("header a[href='/account/login/']");
  readonly cartIcon = this.page.locator('header #ajax-cart a');
  readonly searchInput = this.page.locator("#nav-search input[name='q']");
  readonly cartAmount = this.page.locator('header .js-cart-widget-amount.badge-amount');
  readonly heroSlideImage = this.page
    .locator('.js-home-main-slider-visibility .swiper-slide img.slider-image')
    .first();
  readonly carouselPrev = this.page.locator('.js-swiper-home-prev');
  readonly carouselNext = this.page.locator('.js-swiper-home-next');
  readonly whatsappButton = this.page.locator('a.btn-whatsapp');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<this> {
    await this.page.goto('/');
    return this;
  }

  menuItem(label: string) {
    return this.page.getByRole('link', { name: label }).first();
  }

  async goToProntaEntrega(): Promise<ProntaEntregaPage> {
    await this.prontaEntregaLink.click();
    await this.page.waitForURL(/pronta-entrega/);
    return new ProntaEntregaPage(this.page);
  }

  async clickMenuItem(label: string, expectedUrlPart: string): Promise<this> {
    await this.menuItem(label).click();
    await this.page.waitForURL((url) => url.href.includes(expectedUrlPart));
    return this;
  }

  async search(term: string): Promise<this> {
    await this.searchIcon.click();
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/\/search\//);
    return this;
  }

  async openSearch(): Promise<this> {
    await this.searchIcon.click();
    return this;
  }
}
