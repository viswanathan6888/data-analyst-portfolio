import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  define: {
    'process.env.YOUTUBE_API_KEY': JSON.stringify(process.env.YOUTUBE_API_KEY || ''),
    'process.env.VITE_YOUTUBE_API_KEY': JSON.stringify(process.env.VITE_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || ''),
    'process.env.VITE_DEFAULT_VIDEO_ID': JSON.stringify(process.env.VITE_DEFAULT_VIDEO_ID || 'CobjbCF-Rvw'),
  }
});
