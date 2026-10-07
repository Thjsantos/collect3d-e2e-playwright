import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  currentUrl(): string {
    return this.page.url();
  }

  title(): Promise<string> {
    return this.page.title();
  }
}
