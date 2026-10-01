import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.glsl'],
  build: { target: 'es2022', sourcemap: true, chunkSizeWarningLimit: 2000 },
  // allow access through temporary tunnels (e.g. Cloudflare quick tunnels) for headset testing
  server: { host: true, allowedHosts: ['.trycloudflare.com'] },
  preview: { host: true, allowedHosts: ['.trycloudflare.com'] },
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
} as any);
