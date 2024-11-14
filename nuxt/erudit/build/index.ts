import chalk from 'chalk';

import { logger } from '@erudit/logger';

import setupLanguage from './language';
import buildContributors from './contributors';

export default async function build()
{
    logger.start('Building project...');

    await setupLanguage();
    await buildContributors();

    logger.success(chalk.green.bold(`Project built successfully!`));
}