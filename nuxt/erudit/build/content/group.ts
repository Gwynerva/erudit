import type { ContentGroup } from 'erudit';

import type { NavNode } from '@erudit/nav';
import { debug, stress } from '@erudit/logger';
import type { DbContent } from '@/erudit/db/entities/Content';
import { DbGroup } from '@/erudit/db/entities/Group';
import { DB } from '@/erudit/db';

export default async function buildGroup(navGroup: NavNode, contentGroup: ContentGroup, dbContent: DbContent)
{
    debug.info(`Adding group ${stress(navGroup.id)}...`);

    const dbGroup = new DbGroup;
    dbGroup.contentId = navGroup.id;
    dbGroup.type = contentGroup.type ?? 'folder';

    await DB.manager.save(dbGroup);
}