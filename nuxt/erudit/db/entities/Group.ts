import { Column, Entity, PrimaryColumn } from 'typeorm';
import type { ContentGroupType } from 'erudit';

@Entity('group')
export class DbGroup
{
    @PrimaryColumn('varchar')
    contentId: string;

    @Column('varchar')
    type: ContentGroupType;
}