import { Column, Entity, PrimaryColumn } from 'typeorm';
import type { TopicParts } from '@/shared/topic';

@Entity('topic')
export class DbTopic
{
    @PrimaryColumn('varchar')
    contentId: string;

    @Column('simple-json')
    parts: TopicParts;

    @Column('varchar', { nullable: true })
    article: string;

    @Column('varchar', { nullable: true })
    summary: string;

    @Column('varchar', { nullable: true })
    practice: string;
}