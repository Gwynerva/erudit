import { pastel } from 'gradient-string';
import chalk from 'chalk';
import { existsSync, mkdirSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';

import { CONTEXT, setupContext } from '../context';
import branding from '../../textLogo';

export function showBranding()
{
    console.log(pastel.multiline(branding));
}

export function sharedInit(options)
{
    showBranding();
    setupContext(options);
    console.log(CONTEXT);
    console.log();

    if (!existsSync(CONTEXT.projectDir))
        throw new Error(`Project directory '${CONTEXT.projectDir}' does not exist!`);
}

export function showCommand(command: string)
{
    console.log(chalk.dim('Running command:'), chalk.bold(command));
    console.log();
}

export function prepareBuildDir()
{
    const autoNuxtDir = CONTEXT.buildDir + '/nuxt';
    const outputSymlink = CONTEXT.projectDir + '/.output';

    if (existsSync(outputSymlink))
        unlinkSync(outputSymlink);

    rmSync(CONTEXT.buildDir, { recursive: true, force: true });

    mkdirSync(CONTEXT.buildDir);
    mkdirSync(autoNuxtDir);

    const nuxtConfig = `
        export default {
            compatibilityDate: '2024-10-31',
            extends: [
                '${CONTEXT.packageDir + '/nuxt'}'
            ],
            vite: {
                cacheDir: '${autoNuxtDir + '/.nuxt/cache/vite'}'
            },
        }
    `;

    const env = `
        ERUDIT_PACKAGE_DIR=${CONTEXT.packageDir}
        ERUDIT_PROJECT_DIR=${CONTEXT.projectDir}
        ERUDIT_BUILD_DIR=${CONTEXT.buildDir}
        ERUDIT_TARGETS=${JSON.stringify(CONTEXT.targets)}
    `;

    writeFileSync(autoNuxtDir + '/.env', env, 'utf-8');
    writeFileSync(autoNuxtDir + '/nuxt.config.ts', nuxtConfig, 'utf-8');
}