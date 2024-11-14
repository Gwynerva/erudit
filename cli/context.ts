import { resolve } from 'node:path';

export interface Context
{
    packageDir: string;
    projectDir: string;
    buildDir:   string;
    targets:    string[];
}

export let CONTEXT: Context;

export function setupContext(options)
{
    const packageDir = winToUnix(resolve(import.meta.dirname, '..'));
    const projectDir = winToUnix(resolve(process.cwd(), options.project));

    CONTEXT = {
        packageDir,
        projectDir,
        buildDir:   projectDir + '/.erudit',
        targets:    options.target || [],
    }
}

function winToUnix(path: string): string
{
    return path.replace(/\\/g, '/');
}