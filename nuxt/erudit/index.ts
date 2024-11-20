import { loadEruditConfig } from '@erudit/config';
import { DB } from '@erudit/db';

import build from '@erudit/build';
import clear from '@erudit/build/clear';
import { registerGlobals } from '@erudit/global';

export let ERUDIT_BUILD: Promise<void>;

export default async function eruditInit(nitro: any)
{
    ERUDIT_BUILD = new Promise(resolve => {
        init().then(() => resolve());
    });

    nitro.hooks.hook('close', clear);
}

async function init()
{
    await registerGlobals();
    await loadEruditConfig();
    await DB.initialize();
    await build();
}