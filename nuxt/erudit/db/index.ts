import { DataSource } from 'typeorm';

import { ERUDIT_BUILD_DIR } from '@erudit/const';

import { Contributor } from './entities/Contributor';

export const DB = new DataSource({
    type: 'sqlite',
    database: ERUDIT_BUILD_DIR + '/data.sqlite',
    synchronize: true,
    entities: [
        Contributor,
    ]
});