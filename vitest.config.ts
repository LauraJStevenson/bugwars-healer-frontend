import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
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
          lines: 0,
          functions: 0,
          branches: 0,
          statements: 0,
        },
      },
    },
  }),
);
