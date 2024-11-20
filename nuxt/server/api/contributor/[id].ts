import { DB } from '@erudit/db';
import { DbContributor } from '@erudit/db/entities/Contributor';

export default defineEventHandler(async event => {
    const contributorId = getRouterParam(event, 'id');
    const contributor = await DB.manager.findOneBy(DbContributor, { contributorId });

    return contributor;
});