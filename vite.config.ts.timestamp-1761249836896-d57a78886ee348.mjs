// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      // GEMINI_API_KEY deve ser o nome da variável de ambiente configurada no Vercel
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, ".")
        // Aponta para raiz
      }
    }
    // Garante que o index.html está na raiz, se não estiver na pasta public
    // Se index.html estiver em public/, esta configuração de root pode não ser necessária
    // ou publicDir pode ser configurado. Por padrão, Vite serve index.html da raiz.
    // root: process.cwd(), 
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIENhcnJlZ2EgdmFyaVx1MDBFMXZlaXMgZGUgYW1iaWVudGUgZG8gYXJxdWl2byAuZW52IG5hIHJhaXogZG8gcHJvamV0b1xuICAvLyBQYXJhIFZlcmNlbCwgZXN0YXMgdmFyaVx1MDBFMXZlaXMgc1x1MDBFM28gY29uZmlndXJhZGFzIG5vIGRhc2hib2FyZCBkbyBwcm9qZXRvXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIGRlZmluZToge1xuICAgICAgLy8gR0VNSU5JX0FQSV9LRVkgZGV2ZSBzZXIgbyBub21lIGRhIHZhcmlcdTAwRTF2ZWwgZGUgYW1iaWVudGUgY29uZmlndXJhZGEgbm8gVmVyY2VsXG4gICAgICAncHJvY2Vzcy5lbnYuQVBJX0tFWSc6IEpTT04uc3RyaW5naWZ5KGVudi5HRU1JTklfQVBJX0tFWSksXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuJyksIC8vIEFwb250YSBwYXJhIHJhaXpcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBHYXJhbnRlIHF1ZSBvIGluZGV4Lmh0bWwgZXN0XHUwMEUxIG5hIHJhaXosIHNlIG5cdTAwRTNvIGVzdGl2ZXIgbmEgcGFzdGEgcHVibGljXG4gICAgLy8gU2UgaW5kZXguaHRtbCBlc3RpdmVyIGVtIHB1YmxpYy8sIGVzdGEgY29uZmlndXJhXHUwMEU3XHUwMEUzbyBkZSByb290IHBvZGUgblx1MDBFM28gc2VyIG5lY2Vzc1x1MDBFMXJpYVxuICAgIC8vIG91IHB1YmxpY0RpciBwb2RlIHNlciBjb25maWd1cmFkby4gUG9yIHBhZHJcdTAwRTNvLCBWaXRlIHNlcnZlIGluZGV4Lmh0bWwgZGEgcmFpei5cbiAgICAvLyByb290OiBwcm9jZXNzLmN3ZCgpLCBcbiAgfTtcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFVBQVU7QUFDakIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBSGxCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBR3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsUUFBUTtBQUFBO0FBQUEsTUFFTix1QkFBdUIsS0FBSyxVQUFVLElBQUksY0FBYztBQUFBLElBQzFEO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxHQUFHO0FBQUE7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
