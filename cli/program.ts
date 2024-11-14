import { Command } from 'commander';
import { version } from '../package.json';

import build from './commands/build';
import dev from './commands/dev';
import preview from './commands/preview';

export const program = new Command();

program
    .name('erudit')
    .description('CLI tool for managing sites that use Erudit engine')
    .version(version);

export const previewCommand = program.command('preview').action(preview);
export const buildCommand = program.command('build').action(build);
export const devCommand = program.command('dev').action(dev);

addProjectOption(previewCommand);

[buildCommand, devCommand].forEach(command => {
    addProjectOption(command);
    addTargetOption(command);
});

//
// Options
//

function addTargetOption(program: Command): Command
{
    return program.option('-t, --target [paths...]', 'paths to process only specific books and topics', []);
}

function addProjectOption(program: Command): Command
{
    return program.option('-p, --project [path]', 'path to project', '.');
}