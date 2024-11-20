import { contentDir, nuxtPath, packageDir, projectDir } from './erudit/const';

export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: true,
    alias: {
        '@':        nuxtPath(),
        '@erudit':  nuxtPath('/erudit'),
        '@server':  nuxtPath('/server'),
        '@scripts': nuxtPath('/scripts'),
        '$':        nuxtPath('/styles'),
    },
    watch: [nuxtPath('/nuxt.config.ts')],
    ignore: [
        // Contributors assets
        ...[
            '*/contributor.{js,ts}',
            '*/description.bi'
        ].map(pattern => projectDir(`/contributors/${pattern}`)),
    ],
    experimental: {
        // @ts-ignore Prevent duplicating CSS
        inlineSSRStyles: false,
        asyncContext: true,
    },
    nitro: {
        plugins: [
            packageDir('/nuxt/erudit/index.ts')
        ],
        devServer: {
            watch: [
                nuxtPath('/erudit'),
                nuxtPath('/languages'),
                projectDir('/contributors'),
                contentDir(), // Think of some more precise update way. Rebuilding the whole project on each change sucks :'(
                projectDir('/erudit.*'),
            ]
        },
        publicAssets: [
            {
                baseURL: 'asset/contributor',
                dir: projectDir('/contributors'),
                maxAge: 60 * 60 * 24 * 30,
            }
        ],
        esbuild: {
            options: {
                tsconfigRaw: {
                    compilerOptions: {
                        experimentalDecorators: true, // Make TypeORM work with Nuxt
                    },
                },
            },
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                }
            },
        },
    },
});