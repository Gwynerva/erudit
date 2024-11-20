import { NAV } from '@erudit/nav';
import { generateFrontNav } from '@erudit/nav/front';

export default defineEventHandler(async () => {
    return await generateFrontNav(NAV, false);
});