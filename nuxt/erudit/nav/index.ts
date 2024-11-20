import type { ContentType } from 'erudit';

/**
 * NavNode is meant to be fast, universal and contain only critical data from which all other information can be derived.
 */
export interface NavNode
{
    type: ContentType;
    dir: string;
    id: string;
    fullId: string;
    pos: number;
    skipId: boolean;
    children?: NavNode[];
    parent?: NavNode;
}

export let NAV: NavNode;
export let NAV_BOOKS: Record<string, NavNode> = {};

export function setNav(nav: NavNode)
{
    NAV = nav;
}

export function setNavBook(bookId: string, bookNav: NavNode)
{
    NAV_BOOKS[bookId] = bookNav;
}

export async function walkNav<TStepData>(step: (node: NavNode, stepData: TStepData) => Promise<TStepData | false>, from: NavNode, stepData: TStepData)
{
    const newBranchData = await step(from, stepData);

    if (newBranchData !== false)
        if (from.children)
            for (const childNode of from.children)
                await walkNav(step, childNode, newBranchData);
}