import chalk from 'chalk';
import { loadConfig } from 'c12';
import type { Content } from 'erudit';

import { DbContent } from '@/erudit/db/entities/Content';
import { DB } from '@/erudit/db';
import { NAV, walkNav, type NavNode } from '@erudit/nav';
import { debug, logger } from '@erudit/logger';
import { contentDir } from '@erudit/const';

import buildBook from './book';
import buildGroup from './group';
import buildTopic from './topic';

let position = 0;
let [bookCounter, groupCounter, topicCounter] = [0, 0, 0];

export default async function buildContent()
{
    if (!NAV)
        return;

    debug.start('Building content...');

    position = 0;
    [bookCounter, groupCounter, topicCounter] = [0, 0, 0];

    await walkNav(async (node) => {
        if (!node.id) return; // Skipping root node

        position++;
        const { navItem, contentItem, dbContent, buildFunction } = await prepareContentItem(node);
        await buildFunction(navItem, contentItem, dbContent);
    }, NAV, undefined);

    logger.success('Content built successfully!', chalk.dim(`(B: ${bookCounter}, G: ${groupCounter}, T: ${topicCounter})`));
}

async function prepareContentItem(navItem: NavNode)
{
    const { config: contentItem } = await loadConfig<Content>({ configFile: contentDir(`/${navItem.dir}/${navItem.type}`) });
    const dbContent = new DbContent;
    const buildFunction = (() => {
        switch (navItem.type)
        {
            case 'book': bookCounter++; return buildBook;
            case 'group': groupCounter++; return buildGroup;
            case 'topic': topicCounter++; return buildTopic;
        }
    })();

    dbContent.contentId = navItem.id;
    dbContent.fullId = navItem.fullId;
    dbContent.type = navItem.type;
    dbContent.position = position;
    dbContent.title  = contentItem.title;
    dbContent.navTitle = contentItem.navTitle;
    dbContent.flags = contentItem.flags;

    await DB.manager.save(dbContent);

    return {
        navItem,
        contentItem,
        dbContent,
        buildFunction,
    }
}