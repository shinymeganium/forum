import { expect, Page, test } from "@playwright/test";

const frontpage = async (page: Page) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/softforum/i);
};

test("visit homepage", async ({ page }) => {
  await frontpage(page);
});

test("visit and refresh login page", async ({ page }) => {
  await frontpage(page);

  await page.getByRole("navigation").getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();
  
  await page.reload();
  
  await expect(page.getByText(/login to continue/i)).toBeVisible();
});

test("check backend health endpoint", async ({ request }) => {
  const response = await request.get(
    "https://softforum.onrender.com/api/health",
    { timeout: 60000 }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body).toEqual({ message: "ok" });
});