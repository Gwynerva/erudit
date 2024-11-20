import type { FNavBase, FNavGroup, FNavItem, FNavTopic } from '@/shared/frontNav';
import { walkNav, type NavNode } from '.';
import { DB } from '@erudit/db';
import { DbContent } from '@erudit/db/entities/Content';
import { DbGroup } from '@erudit/db/entities/Group';
import { DbTopic } from '@erudit/db/entities/Topic';

interface StepData
{
    level: number;
    items: FNavItem[];
}

export async function generateFrontNav(from: NavNode, includeBookNav: boolean)
{
    const step: Parameters<typeof walkNav<StepData>>[0] = async (node, stepData) =>
    {
        if (!node.id) return stepData;

        const dbContent = await DB.manager.findOne(DbContent, { where: { contentId: node.id } });

        const groupType = await (async () => {
            if (node.type !== 'group') return undefined;
            const dbGroup = await DB.manager.findOne(DbGroup, { select: ['type'], where: { contentId: node.id } });
            return dbGroup.type;
        })();

        const fNavBase: FNavBase = {
            type: node.type === 'group' ? groupType : node.type,
            id: node.id,
            label: dbContent.navTitle ?? dbContent.title ?? node.id.split('/').pop(),
            flags: dbContent.flags,
            level: stepData.level,
        }

        if (node.type === 'topic')
        {
            const dbTopic = await DB.manager.findOne(DbTopic, { select: ['parts'], where: { contentId: node.id } });
            (fNavBase as FNavTopic).part = Object.keys(dbTopic.parts)[0] as any;
        }

        stepData.items.push(fNavBase as any);

        const processChildren = node.type === 'group' || (node.type === 'book' && includeBookNav);

        if (processChildren && node.children.length)
        {
            const fNavGroup = fNavBase as FNavGroup;
            const children: FNavItem[] = [];

            for (const childNode of node.children)
                await walkNav<StepData>(step, childNode, { level: ['separator', 'book'].includes(fNavBase.type) ? stepData.level : stepData.level + 1, items: children });

            if (children.length)
                fNavGroup.children = children;
        }

        return false;
    }

    //
    //
    //

    const topLevelItems: FNavItem[] = [];
    await walkNav<StepData>(step, from, { level: 0, items: topLevelItems });

    return topLevelItems;
}