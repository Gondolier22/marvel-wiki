// https://vite.dev/config/
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // Verifica que esta ruta sea correcta
    include: ['./src/**/*.test.tsx', './src/**/*.test.ts'],
    exclude: [
      './src/frameworks/ui/mocks/**/*.ts',
      './src/frameworks/ui/mocks/**/*.tsx',
      './src/main.tsx',
    ],
  },
});
