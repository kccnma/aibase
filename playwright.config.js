const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",
    use: {
        baseURL: "http://127.0.0.1:4179",
        ...devices["Desktop Chrome"],
    },
    webServer: {
        command: "python3 -m http.server 4179 --bind 127.0.0.1",
        url: "http://127.0.0.1:4179",
        reuseExistingServer: !process.env.CI,
    },
});
