import { DB } from '@erudit/db';
import { DbContributor } from '@erudit/db/entities/Contributor';

export default defineEventHandler(async () => {
    return await DB.manager.count(DbContributor);
});