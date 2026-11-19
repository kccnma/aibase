const { test, expect } = require("@playwright/test");

test("stack keeps its children vertical with consistent spacing", async ({ page }) => {
    for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/styleguide.html");

        const children = page.locator("#stack-example > *");
        await expect(children).toHaveCount(3);

        const positions = await children.evaluateAll((elements) =>
            elements.map((element) => {
                const { top, bottom } = element.getBoundingClientRect();
                return { top, bottom };
            }),
        );

        expect(positions[1].top - positions[0].bottom).toBeCloseTo(16, 1);
        expect(positions[2].top - positions[1].bottom).toBeCloseTo(16, 1);
    }
});

test("cluster wraps items with consistent row and column spacing", async ({ page }) => {
    for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/styleguide.html");

        const items = page.locator("#cluster-example > *");
        await expect(items).toHaveCount(4);

        const positions = await items.evaluateAll((elements) =>
            elements.map((element) => {
                const { top, left, right, bottom } = element.getBoundingClientRect();
                return { top, left, right, bottom };
            }),
        );

        expect(positions[1].top).toBeCloseTo(positions[0].top, 1);
        expect(positions[1].left - positions[0].right).toBeCloseTo(16, 1);

        if (width === 390) {
            expect(positions[2].top).toBeGreaterThan(positions[1].top);
            expect(positions[2].top - positions[1].bottom).toBeCloseTo(16, 1);
            expect(positions[3].top).toBeCloseTo(positions[2].top, 1);
            expect(positions[3].left - positions[2].right).toBeCloseTo(16, 1);
        } else {
            for (const [index, position] of positions.slice(1).entries()) {
                expect(position.top).toBeCloseTo(positions[0].top, 1);
                expect(position.left - positions[index].right).toBeCloseTo(16, 1);
            }
        }
    }
});

test("split stacks content on narrow viewports and shares a row on wide viewports", async ({ page }) => {
    for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/styleguide.html");

        const parts = page.locator("#split-example > *");
        await expect(parts).toHaveCount(2);

        const positions = await parts.evaluateAll((elements) =>
            elements.map((element) => {
                const { top, left, right, bottom } = element.getBoundingClientRect();
                return { top, left, right, bottom };
            }),
        );

        if (width === 390) {
            expect(positions[1].top).toBeGreaterThan(positions[0].top);
            expect(positions[1].top).toBeGreaterThan(positions[0].bottom);
        } else {
            expect(positions[1].top).toBeCloseTo(positions[0].top, 1);
            expect(positions[1].left - positions[0].right).toBeCloseTo(16, 1);
        }
    }
});

test("sidebar stacks above content on narrow viewports and sits beside it on wide viewports", async ({ page }) => {
    for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/styleguide.html");

        const parts = page.locator("#sidebar-example > *");
        await expect(parts).toHaveCount(2);

        const positions = await parts.evaluateAll((elements) =>
            elements.map((element) => {
                const { top, left, right, bottom } = element.getBoundingClientRect();
                return { top, left, right, bottom };
            }),
        );

        if (width === 390) {
            expect(positions[1].top).toBeGreaterThan(positions[0].top);
            expect(positions[1].top - positions[0].bottom).toBeCloseTo(16, 1);
        } else {
            expect(positions[1].top).toBeCloseTo(positions[0].top, 1);
            expect(positions[1].left - positions[0].right).toBeCloseTo(16, 1);
        }
    }

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/docs.html");
    await expect(page.locator(".container.with-sidebar > *")).toHaveCount(2);
    await expect(page.locator(".page-layout-twocolumns")).toHaveCount(0);
});
