import { loadConfig } from 'c12';
import { type EruditConfig } from 'erudit';

import { projectDir } from '@erudit/const';

export let ERUDIT_CONFIG: EruditConfig;

export async function loadEruditConfig()
{
    const { config } = await loadConfig<EruditConfig>({ configFile: projectDir('/erudit') });
    ERUDIT_CONFIG = config;
}