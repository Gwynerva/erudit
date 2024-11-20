import chalk from 'chalk';
import { globSync } from 'glob';

import { NAV_BOOKS, setNav, setNavBook, type NavNode } from '@erudit/nav';
import { ERUDIT_CONFIG } from '@erudit/config';
import { debug, logger, stress } from '@erudit/logger';
import { contentDir, ERUDIT_TARGETS } from '@erudit/const';

/** Track registered ids for counting and catching duplicates */
let ids: Record<string, null> = {};
let insideBook: boolean;

export default async function buildNavTree()
{
    debug.start('Building navigation tree...');

    ids = {};
    const rootNode = <NavNode> { dir: '' };
    rootNode.children = detectChildren(rootNode, 0);

    if (ERUDIT_CONFIG.debug.deepLogs)
        debugPrintNav(rootNode);

    const nodeCount = Object.keys(ids).length;

    if (nodeCount === 0)
        logger.warn(`No content nodes were discovered! The site will be empty!`);

    setNav(nodeCount ? rootNode : null);

    logger.success('Navigation tree built successfully!', chalk.dim(`(${nodeCount})`));
}

function detectChildren(parent: NavNode, level: number): NavNode[]
{
    const nodePaths = globSync(`*/{book,group,topic}.{ts,js}`, { cwd: contentDir(`/${parent.dir}`), posix: true });

    if (nodePaths.length === 0)
        return null;

    const children: NavNode[] = [];

    for (const nodePath of nodePaths)
    {
        let id: string, node: NavNode;

        const iterationResult = (() =>
        {
            const match = nodePath.match(/(\d+)(-|\+)([\w-]+)\/(book|group|topic)\..*/);

            if (match === null)
                return; // Wrong path pattern

            try { id = constructId(parent, level, match[3]); }
            catch (e) {
                logger.error(e);
                logger.error(`Skipping ${stress('content/' + parent.dir + '/' + nodePath)} node because of ID duplication error.\nThis is most likely caused by parent-child directories end up having same ids when not carefully using '+' which skips current ID part and scan child nodes!`)
                return; // Duplicate node ids are not allowed
            }

            node = {
                type: match[4] as any,
                dir: (level ? parent.dir + '/' : '') + nodePath.split('/')[0],
                fullId: (parent.fullId ? `${parent.fullId}/` : '')  + match[3],
                id,
                pos: +match[1],
                skipId: match[2] === '+',
                parent,
            };

            if (!satisfiesTargets(node))
                return; // Node doesn't match targets

            switch (node.type)
            {
                case 'topic':
                    const partsPaths = globSync(contentDir('/' + node.dir + '/{article,summary,practice}.bi'));
                    if (partsPaths.length === 0) return; // Skip topics without any parts
                    break;
                case 'book':
                    if (node.skipId) return; // Books with skipId are not allowed
                    if (insideBook) return; // Books inside books are not allowed
                    else insideBook = true;
                case 'group':
                    node.children = detectChildren(node, level + 1);
                    if (node.children === null) return; // Empty books and groups are skipped
            }

            return true;
        })();

        if (iterationResult)
        {
            // Node was not rejected
            // Adding node to NAV

            if (node.type === 'book')
            {
                if (insideBook) insideBook = false; // Exit 'inside book' state
                setNavBook(node.id, node);
            }

            children.push(node);
        }
        else
        {
            // Can't create nav node for whatever reason
            // Undo some global actions...

            delete ids[id];
        }
    }

    if (children.length > 0)
    {
        children.sort((a, b) => a.pos - b.pos);
        return children;
    }
    else return null;
}

function constructId(parent: NavNode, level: number, lastIdPart: string)
{
    let id = lastIdPart;

    if (level > 0)
    {
        const parentId = parent.skipId ? parent.id.split('/').slice(0, -1).join('/') : parent.id;
        id = (parentId ? `${parentId}/` : '') + id;
    }

    if (id in ids)
        throw `Duplicate id ${stress(id)}!`;

    ids[id] = null;

    return id;
}

function satisfiesTargets(node: NavNode): boolean
{
    const targets = ERUDIT_TARGETS.concat(ERUDIT_CONFIG.targets);

    if (targets.length === 0)
        return true;

    for (const target of targets)
        if (node.dir.startsWith(target) || target.indexOf(node.dir) === 0)
            return true;

    return false;
}

function debugPrintNav(nav: NavNode)
{
    const logNode = (node: NavNode, indent: number) =>
    {
        debug.log(node === nav ? chalk.dim('<root>') : `${'  '.repeat(indent)}${node.id} ${chalk.dim(`[${node.type}, ${node.pos}]`)}`);
        if (node.children)
            for (const child of node.children)
                logNode(child, indent + 1);
    }

    logNode(nav, 0);
}