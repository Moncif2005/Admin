import { defineConfig, Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Plugin to resolve figma:asset and @figma-asset/* imports as placeholder transparent PNGs
function figmaAssetPlugin(): Plugin {
  // 1x1 transparent PNG in base64
  const PLACEHOLDER =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/') || id.startsWith('@figma-asset/')) {
        return '\0figma-asset:' + id
      }
      return null
    },
    load(id) {
      if (id.startsWith('\0figma-asset:')) {
        return `export default ${JSON.stringify(PLACEHOLDER)}`
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
