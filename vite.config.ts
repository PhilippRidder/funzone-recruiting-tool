import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'

// base: './' → relative Pfade, damit die App auch als iframe-Einbettung
// unter einem beliebigen Unterpfad des Management-Tools läuft.
//
// DEMO-MODUS (Mock-Daten, kein Login) – gleiches Muster wie im CRM-Repo:
// - immer im Dev-Server (command === 'serve', z. B. `npm run dev`)
// - in Builds, wenn VITE_DEMO=1 gesetzt ist
const mockClient = fileURLToPath(new URL('./src/api/client.mock.ts', import.meta.url))

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const demo = command === 'serve' || env.VITE_DEMO === '1'
  return {
    plugins: [react()],
    base: './',
    server: { port: 5174 },
    resolve: demo
      ? {
          alias: [
            { find: '../api/client', replacement: mockClient },
            { find: './api/client', replacement: mockClient },
            { find: '../../api/client', replacement: mockClient },
            { find: '../../../api/client', replacement: mockClient },
          ],
        }
      : {},
  }
})
