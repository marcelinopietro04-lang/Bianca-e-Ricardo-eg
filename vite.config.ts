import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function resolveSiteOrigin(): string {
  const raw =
    process.env.APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : '');
  return raw.replace(/\/+$/, '');
}

function socialMetadataPlugin(): Plugin {
  return {
    name: 'social-metadata-origin',
    transformIndexHtml(html) {
      const origin = resolveSiteOrigin();
      if (!origin) return html;

      const shareImage = `${origin}/assets/invitation/couple_photo_new.jpg`;
      const updated = html.replace(
        /https:\/\/i\.imgur\.com\/NbgyFh1\.jpeg/g,
        shareImage
      );

      return updated.replace(
        '</head>',
        `    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />\n  </head>`
      );
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), socialMetadataPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
