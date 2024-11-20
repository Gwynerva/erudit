import chalk from 'chalk';
import { pastel } from 'gradient-string';

import { ERUDIT_CONFIG } from '@erudit/config';

const defaultPrefix = pastel('Erudit');
const debugPrefix = chalk.dim('Erudit Debug');

function createLogger(debug: boolean = false)
{
    const prefix = debug ? debugPrefix : defaultPrefix;
    const _log = (...messages: any[]) => {
        if (debug)
            if (!ERUDIT_CONFIG.debug?.deepLogs)
                return;

        console.log(chalk.dim('[') + prefix + chalk.dim(']'), ...messages)
    };

    return {
        log:        (...messages: any[]) => _log(...messages),
        info:       (...messages: any[]) => _log(chalk.blue('ℹ️'), ...messages),
        start:      (...messages: any[]) => _log(chalk.magenta('◐'), ...messages),
        success:    (...messages: any[]) => _log(chalk.greenBright('✔'), ...messages),
        warn:       (...messages: any[]) => _log(chalk.bgYellow.black(' WARN '), ...messages),
        error:      (...messages: any[]) => _log(chalk.bgRedBright.black(' ERROR '), ...messages),
    }
}

export const logger = createLogger();
export const debug = createLogger(true);

export function stress(message: string)
{
    return chalk.dim(`'`) + chalk.cyanBright(message) + chalk.dim(`'`);
}