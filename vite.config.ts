import { defineConfig } from 'vite';
import vue3 from '@vitejs/plugin-vue';

// 将URL转换为路径

export default defineConfig({
    plugins: [vue3()],
    build: {
        cssCodeSplit: true,
        outDir: './dist',
        lib: {
            name: 'nodes',
            fileName: 'nodes',

            entry: './packages/components/nodes/index.ts',
            // formats: ['umd','iife','cjs','es'],
            formats: ['es'],

        },

        rollupOptions: {
            external: ['vue', 'element-plus'],
            output: {
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus',

                }
            }
        }
    }
});
