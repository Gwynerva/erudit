import { spawn } from 'node:child_process';

import { devCommand } from '../program';
import { prepareBuildDir, sharedInit, showCommand } from './_shared';
import { CONTEXT } from '../context';

export default async function dev()
{
    sharedInit(devCommand.opts());
    showCommand('dev');

    prepareBuildDir();

    spawn('bun x nuxi dev --host', {
        shell:  true,
        stdio:  'inherit',
        env:    process.env,
        cwd:    CONTEXT.buildDir + '/nuxt',
    });
}