import { Content } from '.';

export interface ContentTopic extends Partial<Content>
{
}

export function defineTopic(topic: Partial<ContentTopic>)
{
    return topic;
}