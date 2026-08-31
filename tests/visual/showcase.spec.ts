import { expect, test } from '@playwright/test';

const screenshotOptions = {
  animations: 'disabled' as const,
  // Keep layout and color regressions strict while allowing small Linux rasterizer differences.
  maxDiffPixels: 2_000,
};

test('renders the three products in one light and dark application shell', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('ByteFolk Design System');
  await expect(page.getByLabel('ByteFolk', { exact: true })).toBeVisible();
  await expect(page.getByLabel('ByteFolk Design System showcase', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Digital Employees' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Memory' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();

  await expect(page).toHaveScreenshot('showcase-light.png', screenshotOptions);

  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();

  await expect(page).toHaveScreenshot('showcase-dark.png', screenshotOptions);
});

test('keeps the shell usable with keyboard navigation and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();

  await page.getByRole('button', { name: 'Digital Employees', exact: true }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('button', { name: 'Memory', exact: true })).toBeFocused();

  const duration = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--ui-duration-normal').trim(),
  );
  expect(duration).toBe('0ms');
});

test('keeps collapsed module labels accessible at a 600px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 900 });
  await page.goto('/');

  const employeeButton = page.getByRole('button', { name: 'Digital Employees', exact: true });
  await expect(employeeButton).toBeVisible();
  await expect(employeeButton).toHaveAttribute('aria-label', 'Digital Employees');
  await expect(employeeButton.locator('.ui-module-rail__label')).toBeHidden();

  await employeeButton.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('button', { name: 'Memory', exact: true })).toBeFocused();
});

test('keeps a dialog centered throughout its entry animation', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({
    content: '.ui-dialog__content { animation-duration: 600ms !important; }',
  });
  await page.getByRole('button', { name: 'Create', exact: true }).click();

  const dialog = page.getByRole('dialog', { name: 'Create in your workspace' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS('animation-name', 'ui-dialog-in');

  await page.waitForTimeout(80);
  const duringAnimation = await dialog.boundingBox();
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  expect(duringAnimation).not.toBeNull();
  expect(
    Math.abs(duringAnimation!.x + duringAnimation!.width / 2 - viewport!.width / 2),
  ).toBeLessThan(3);
  expect(
    Math.abs(duringAnimation!.y + duringAnimation!.height / 2 - viewport!.height / 2),
  ).toBeLessThan(12);

  await page.waitForTimeout(600);
  const settled = await dialog.boundingBox();
  expect(settled).not.toBeNull();
  expect(Math.abs(settled!.x + settled!.width / 2 - viewport!.width / 2)).toBeLessThan(2);
  expect(Math.abs(settled!.y + settled!.height / 2 - viewport!.height / 2)).toBeLessThan(2);
});
