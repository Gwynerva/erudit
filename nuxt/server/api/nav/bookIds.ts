import { NAV_BOOKS } from '@/erudit/nav';

export default defineEventHandler(() => {
    return Object.keys(NAV_BOOKS);
});