// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // The repository is named `TheAnoof.github.io`, so GitHub Pages serves it at
  // the root of this domain and no `base` path is needed. If the site ever
  // moves to a project repository (e.g. github.com/TheAnoof/portfolio), set
  // `base: '/portfolio'` — every internal link already goes through `url()`
  // in src/lib/site.ts, so nothing else needs to change.
  site: 'https://theanoof.github.io',

  // Keep classic whitespace handling so spaces between inline elements
  // (e.g. "text <a>link</a> text") are never collapsed unexpectedly.
  compressHTML: true,

  // Self-hosted web fonts: downloaded once at build time and served from this
  // site, so visitors' browsers never contact a third-party font service.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-sans',
      weights: ['400 700'],
      // Italic is not used anywhere; omitting it saves a 75 KB preloaded file.
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  // Hide Astro's developer toolbar so local previews look like the real site.
  devToolbar: { enabled: false },

  image: {
    // Adds tiny global styles so optimized images scale down on small screens.
    responsiveStyles: true,
  },
});
