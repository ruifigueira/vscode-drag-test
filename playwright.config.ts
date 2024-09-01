import type { VSCodeTestOptions, VSCodeWorkerOptions } from 'vscode-test-playwright';
import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig<VSCodeTestOptions, VSCodeWorkerOptions>({
  testDir: path.join(__dirname, 'tests'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    extensionDevelopmentPath: path.join(__dirname, 'extension'),
    vscodeTrace: 'on',
  },
  projects: [
    {
      name: '1.92.0',
      use: { vscodeVersion: '1.92.0' },
    },
    {
      name: '1.92.1',
      use: { vscodeVersion: '1.92.1' },
    },
  ],
});
