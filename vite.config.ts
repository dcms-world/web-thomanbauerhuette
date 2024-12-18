import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'import.meta.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(env.RECAPTCHA_SITE_KEY)
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      historyApiFallback: true,
    },
    preview: {
      historyApiFallback: true,
    },
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
    },
  };
});
