import { test, expect } from "@playwright/test";

// TODO: - click Login button
//  - expect Login button toBeVisible
//  - fill email password
//  - click Login button
//  - exprect "Log in succesfully"
//  - expect "Sign out button visible"

const URL_FRONTEND = "http://localhost:5173/";

test("Should allow user to login", async ({ page }) => {
  await page.goto(URL_FRONTEND);
  // click button Login
  await page.getByRole("link", { name: "Log in" }).click();

  // expect Login button visible
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  //  - fill email password
  await page.locator("[name=email]").fill("quangminh0512@icloud.com");
  await page.locator("[name=password]").fill("minh123");

  // click button login
  await page.getByRole("button", { name: "Login" }).click();

  // expect Login succesfully
  await expect(page.getByText("Login successfully")).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
