import chalk from 'chalk';
import { createJiti } from 'jiti';
import { defaultConfig } from 'erudit';

import { ERUDIT_CONFIG } from '@erudit/config';
import { nuxtPath } from '@erudit/const';
import { debug, logger, stress } from '@erudit/logger';
import { LANGUAGE, setLanguage } from '@erudit/language';

export default async function setupLanguage()
{
    debug.start('Setting up language...');

    const jiti = createJiti(import.meta.url);

    const targetLanguage = ERUDIT_CONFIG.language;
    const defaultLanguage = defaultConfig.language;

    if (targetLanguage === defaultLanguage)
    {
        debug.info(`Loading master language, which is ${stress(defaultLanguage)}...`)
        await doSetupLanguage(defaultLanguage, jiti);
    }
    else
    {
        debug.info(`Loading custom language ${stress(targetLanguage)}...`);

        try { await doSetupLanguage(targetLanguage, jiti); }
        catch
        {
            logger.warn(`No language file found for language ${stress(ERUDIT_CONFIG.language)}! Switching to master language...`);
            await doSetupLanguage(defaultLanguage, jiti);
        }
    }

    logger.success('Language setup complete!', chalk.dim(`(${LANGUAGE._language})`));
}

async function doSetupLanguage(languageCode: string, jiti)
{
    const languageModule = await jiti.import(nuxtPath(`/languages/${languageCode}`));
    setLanguage(languageModule);
}