import { Content } from '.';

export type ContentGroupType = 'separator' | 'folder';

export interface ContentGroup extends Partial<Content>
{
    /** Type of group that defines how it will look in site navigation */
    type: ContentGroupType;
}

export function defineGroup(group: Partial<ContentGroup>)
{
    return group;
}