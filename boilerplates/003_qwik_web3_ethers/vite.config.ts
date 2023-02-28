import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { qwikReact } from '@builder.io/qwik-react/vite'

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        ssr: {
          outDir: 'dist/server/',
        },
        client: {
          outDir: 'dist/app/',
        },
      }),
      qwikReact(),
      tsconfigPaths(),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    server: {
      host: process.env.SERVER_HOST || 'localhost',
      port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 5173,
      open: process.env.VITE_OPEN_BROWSER_BY_DEFAULT ? !!parseInt(process.env.VITE_OPEN_BROWSER_BY_DEFAULT) : true,
    },
  }
})
