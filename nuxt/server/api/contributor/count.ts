import { DB } from '@erudit/db';
import { Contributor } from '@erudit/db/entities/Contributor';

export default defineEventHandler(async () => {
    return await DB.manager.count(Contributor);
});