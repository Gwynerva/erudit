import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { dependencies, devDependencies } from './package.json';

export default defineConfig({
    build: {
        sourcemap: true,
        minify: false,
        lib: {
            formats: ['es'],
            entry: {
                'index': 'package/index.ts',
            },
        },
        rollupOptions: {
            external: moduleId => moduleId.startsWith('node:') || dependencies[moduleId] || devDependencies[moduleId],
            input: {
                index: 'package/index.ts',
                cli: 'cli/index.ts',
            },
        },
    },
    plugins: [
        dts({ rollupTypes: true })
    ],
});