const { test, expect } = require("@playwright/test");

test("mobile navigation opens and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const path of ["/", "/docs.html", "/styleguide.html", "/roadmap.html"]) {
        await page.goto(path);

        const navigation = page.getByRole("navigation", { name: "Primary" });
        const toggle = page.getByRole("button", { name: "Menu" });

        await expect(toggle).toBeVisible();
        await expect(page.locator('#primary-navigation a[href="roadmap.html"]')).toHaveCount(1);
        await expect(page.locator(".footer-nav a[href='roadmap.html']")).toHaveCount(1);
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(navigation).toBeHidden();

        await toggle.press("Enter");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(navigation).toBeVisible();

        const homeLink = navigation.getByRole("link", { name: "Home" });
        await page.keyboard.press("Tab");
        await expect(homeLink).toBeFocused();
        await page.keyboard.press("Escape");

        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(navigation).toBeHidden();
        await expect(toggle).toBeFocused();
    }
});

test("desktop navigation stays visible without a menu toggle", async ({ page }) => {
    for (const width of [768, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/");

        await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
    }
});

test("navigation remains available when JavaScript is disabled", async ({ browser }) => {
    const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
    await context.close();
});
