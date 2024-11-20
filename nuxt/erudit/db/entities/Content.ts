import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import type { ContentFlags, ContentType } from 'erudit';

@Entity('content')
export class DbContent
{
    @PrimaryColumn('varchar')
    contentId: string;

    @Column('varchar')
    @Index({ unique: true })
    fullId: string;

    @Column('varchar')
    type: ContentType;

    @Column('int')
    position: number;

    @Column('varchar', { nullable: true })
    title: string;

    @Column('varchar', { nullable: true })
    navTitle: string;

    @Column('simple-json', { nullable: true })
    flags: ContentFlags;
}