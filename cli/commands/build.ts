import { spawn } from 'node:child_process';
import { symlinkSync } from 'node:fs';

import { buildCommand } from '../program';
import { prepareBuildDir, sharedInit, showCommand } from './_shared';
import { CONTEXT } from '../context';

export default async function build()
{
    sharedInit(buildCommand.opts());
    showCommand('build');

    prepareBuildDir();

    const buildProcess = spawn('bun x nuxi generate', {
        shell:  true,
        stdio:  'inherit',
        env:    process.env,
        cwd:    CONTEXT.buildDir + '/nuxt',
    });

    buildProcess.on('close', () => {
        symlinkSync(
            CONTEXT.buildDir + '/nuxt/.output/public',
            CONTEXT.projectDir + '/.output',
            'dir'
        );
    });
}