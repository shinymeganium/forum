import { expect, Page } from "@playwright/test";
import { login } from "./login";

export const createThread = async (page: Page, title: string, content: string) => {
  await login(page);

  await page.getByRole("navigation").getByRole("link", { name: /create a thread/i }).click();
  
  await expect(page.getByText(/create a new thread/i)).toBeVisible();

  await page.getByPlaceholder(/thread title/i).fill(title);

  await page.getByPlaceholder(/write your post/i).fill(content);

  await page.getByRole("button", { name: /post/i }).click();

  await expect(page.getByText(content)).toBeVisible();
};