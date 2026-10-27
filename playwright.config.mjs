import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./e2e',
  timeout:45000,
  expect:{timeout:10000},
  retries:0,
  workers:1,
  reporter:[['list'],['html',{outputFolder:'playwright-report',open:'never'}]],
  use:{baseURL:'http://127.0.0.1:4173',browserName:'chromium',headless:true,trace:'on-first-retry'},
  webServer:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:4173/thryvems.html',reuseExistingServer:!process.env.CI,timeout:30000}
});
