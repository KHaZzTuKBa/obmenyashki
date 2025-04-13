import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    server: {
        host: '0.0.0.0',
        port: 80,
        hmr: {
            clientPort: 80,
        },
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api': {
                target: 'http://backend:80',
                changeOrigin: true,

                //   Опционально: для поддержки проксирования WebSocket (например, для SignalR)
                ws: true,
            },
        },
    },
});
