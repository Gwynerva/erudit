import { NAV_BOOKS } from '@erudit/nav';
import { generateFrontNav } from '@erudit/nav/front';

export default defineEventHandler(async event => {
    const bookId = getRouterParam(event, 'id');

    if (!bookId || !(bookId in NAV_BOOKS))
        return false;

    const bookNode = NAV_BOOKS[bookId];

    return await generateFrontNav(bookNode, true);
});