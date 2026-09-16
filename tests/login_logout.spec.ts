import { expect, test } from "@playwright/test";
import { login } from "./helpers/login";

test("login and logout", async ({ page }) => {
  await login(page);

  await page.getByRole("navigation").getByRole("button", { name: /logout/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();

  await page.getByRole("button", { name: /return/i }).click();

  await expect(page.getByRole("navigation").getByRole("button", { name: /login/i })).toBeVisible();
});