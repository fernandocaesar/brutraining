
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente do arquivo .env na raiz do projeto
  // Para Vercel, estas variáveis são configuradas no dashboard do projeto
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // GEMINI_API_KEY deve ser o nome da variável de ambiente configurada no Vercel
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.BUNNY_STORAGE_ZONE_NAME': JSON.stringify(env.BUNNY_STORAGE_ZONE_NAME),
      'process.env.BUNNY_ACCESS_KEY': JSON.stringify(env.BUNNY_ACCESS_KEY),
      'process.env.BUNNY_PULL_ZONE_URL': JSON.stringify(env.BUNNY_PULL_ZONE_URL),
      'process.env.BUNNY_UPLOAD_URL': JSON.stringify(env.BUNNY_UPLOAD_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'), // Aponta para raiz
      },
    },
    // Garante que o index.html está na raiz, se não estiver na pasta public
    // Se index.html estiver em public/, esta configuração de root pode não ser necessária
    // ou publicDir pode ser configurado. Por padrão, Vite serve index.html da raiz.
    // root: process.cwd(), 
  };
});