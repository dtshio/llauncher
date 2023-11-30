import { defineConfig } from 'vite';

import { TailwindCSSVitePlugin as tailwind } from 'tailwindcss-vite-plugin'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
export default defineConfig({
    plugins: [react(), tailwind()]
});
