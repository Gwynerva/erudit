import type { ContentFlags } from 'erudit';
import type { TopicPart } from './topic';

export type FNavType = 'book' | 'topic' | 'separator' | 'folder';

export interface FNavBase
{
    type: FNavType;
    id: string;
    label: string;
    level: number;
    flags?: ContentFlags;
}

export interface FNavTopic extends FNavBase
{
    type: 'topic';
    part: TopicPart;
}

export interface FNavGroup extends FNavBase
{
    type: 'book' | 'separator' | 'folder';
    children?: FNavItem[];
}

export interface FNavBook extends FNavGroup
{
    type: 'book';
}

export interface FNavSeparator extends FNavGroup
{
    type: 'separator';
}

export interface FNavFolder extends FNavGroup
{
    type: 'folder';
}

export type FNavItem = FNavTopic | FNavBook | FNavSeparator | FNavGroup;