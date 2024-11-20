import chalk from 'chalk';

import { logger } from '@erudit/logger';

import setupLanguage from './language';
import buildContributors from './contributors';
import buildNavTree from './nav';
import buildContent from './content';

export default async function build()
{
    logger.start('Building project...');

    await setupLanguage();
    await buildContributors();
    await buildNavTree();
    await buildContent();

    logger.success(chalk.green.bold(`Project built successfully!`));
}