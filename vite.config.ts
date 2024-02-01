import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: 'chrome',
    },
  },
  build: {
    lib: {
      entry: './timezz.ts',
      name: 'timezz',
      fileName: 'timezz',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        // ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
        // ...Object.keys(pkg.peerDependencies || {}),
      ],
    },
  },
});
