import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress' }), // Brotli (más eficiente)
    compression({ algorithm: 'gzip' }) // Gzip (fallback)
  ],
  resolve: {
    alias: {
      '@': '/src', // Permite importar archivos más fácilmente
    }
  },
  server: {
    port: 3000,
    open: true, // Abre automáticamente el navegador
    cors: true // Habilita CORS para evitar problemas de recursos externos
  },
  build: {
    target: 'esnext', // Usa la última versión de JavaScript para mejor rendimiento
    minify: 'terser', // Minificación avanzada de código
    sourcemap: false, // Evita archivos .map en producción para mejorar rendimiento
    chunkSizeWarningLimit: 500, // Aumenta el límite de advertencia para archivos grandes
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separa librerías en un chunk aparte
          }
        }
      }
    }
  },
  preview: {
    port: 5000, // Puerto para previsualizar la build en producción
    open: true
  }
});
