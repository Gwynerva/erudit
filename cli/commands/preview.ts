import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';

import { previewCommand } from '../program';
import { sharedInit, showCommand } from './_shared';
import { CONTEXT } from '../context';

export default async function preview()
{
    sharedInit(previewCommand.opts());
    showCommand('preview');

    const outputPath = CONTEXT.projectDir + '/.output';

    if (!existsSync(outputPath))
        throw new Error(`No '.output' directory found! Did you run 'erudit build'?`);

    spawn('npx serve', {
        shell:  true,
        stdio:  'inherit',
        env:    process.env,
        cwd:    outputPath,
    });
}