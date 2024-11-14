import { rmSync } from 'node:fs';

import { buildDir } from '@erudit/const';
import { DB } from '@erudit/db';

export default async function clear()
{
    console.log('\n');

    await DB.destroy();
    rmSync(buildDir('/data.sqlite'), { force: true });
}