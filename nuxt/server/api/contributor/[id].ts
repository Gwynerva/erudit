import { DB } from '@erudit/db';
import { Contributor } from '@erudit/db/entities/Contributor';

export default defineEventHandler(async event => {
    const contributorId = getRouterParam(event, 'id');
    const contributor = await DB.manager.findOneBy(Contributor, { contributorId });

    return contributor;
});