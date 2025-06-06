import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
