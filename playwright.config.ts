import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
    webServer: {
        command: "ntl dev",
        port: 3000,
    },
    testDir: "src/tests",
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    use: {
        trace: "retain-on-failure",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
};

export default config;
