export interface TopicParts
{
    article?: null;
    summary?: null;
    practice?: null;
}

export type TopicPart = keyof TopicParts;