/**
 * TODO: Avoid polluting global object. Nuxt somehow does not pollute it... Investigate!
 */

import { packageDir } from '@erudit/const';
import { IMPORT } from '@erudit/importer';

const registeredKeys: Record<string, null> = {};

function registerGlobal(key: string, value: any)
{
    if (key in registeredKeys)
        delete globalThis[key];

    if (key in globalThis)
        throw new Error(`Global variable ${key} already exists!`);

    registeredKeys[key] = null;
    globalThis[key] = value;
}

export async function registerGlobals()
{
    for (const [key, value] of Object.entries(await IMPORT(packageDir('/package/global.d.ts'))))
        registerGlobal(key, value);
}