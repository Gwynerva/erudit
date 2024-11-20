import { DataSource } from 'typeorm';

import { ERUDIT_BUILD_DIR } from '@erudit/const';

import { DbContent } from './entities/Content';
import { DbBook } from './entities/Book';
import { DbGroup } from './entities/Group';
import { DbTopic } from './entities/Topic';
import { DbContributor } from './entities/Contributor';

export const DB = new DataSource({
    type: 'sqlite',
    database: ERUDIT_BUILD_DIR + '/data.sqlite',
    synchronize: true,
    entities: [
        DbContent,
        DbBook,
        DbGroup,
        DbTopic,
        DbContributor,
    ]
});