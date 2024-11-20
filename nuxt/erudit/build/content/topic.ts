import { readFileSync } from 'node:fs';
import type { ContentTopic } from 'erudit';

import type { TopicParts } from '@/shared/topic';
import type { NavNode } from '@erudit/nav';
import { debug, stress } from '@erudit/logger';
import type { DbContent } from '@/erudit/db/entities/Content';
import { DbTopic } from '@/erudit/db/entities/Topic';
import { DB } from '@/erudit/db';
import { contentDir } from '@/erudit/const';

export default async function buildTopic(navTopic: NavNode, contentTopic: ContentTopic, dbContent: DbContent)
{
    debug.info(`Adding topic ${stress(navTopic.id)}...`);

    const dbTopic = new DbTopic;
    dbTopic.contentId = navTopic.id;
    dbTopic.parts = {} as any;

    (['article', 'summary', 'practice'] as const).forEach(part => {
        dbTopic[part] = getPart(navTopic.dir, part);
        if (part in dbTopic)
            dbTopic.parts[part] = null;
    });

    await DB.manager.save(dbTopic);
}

function getPart(topicDir: string, part: keyof TopicParts): string
{
    try {
        return readFileSync(contentDir(`/${topicDir}/${part}.bi`), 'utf-8');
    }
    catch { return undefined; }
}