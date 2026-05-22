// astro.config.mjs
// Phase 1: base-path locked from commit 1 to neutralize GH Pages bug #1 (Pitfall #13).
// site + base together produce internal URLs of the form /planetapsilo/<route>/
// Per user decision (01-CONTEXT.md Pre-decided): site = elsolarcg.github.io, base = /planetapsilo, output = static.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://elsolarcg.github.io',
  base: '/planetapsilo',
  trailingSlash: 'ignore',
  output: 'static',
  build: {
    assets: '_astro',
  },
});
