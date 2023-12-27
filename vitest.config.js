const { fileURLToPath } = require('url');
const { configDefaults, defineConfig, mergeConfig } = require('vitest/config');
const viteConfig = require('./vite.config');

module.exports = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: [
          '**/*.d.ts',
          '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
          'src/router/**',
          'src/types/**',
          'src/main.ts',
        ],
        provider: 'v8',
        reporter: ['text', 'json-summary', 'json'],
        reportOnFailure: true,
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  }),
);