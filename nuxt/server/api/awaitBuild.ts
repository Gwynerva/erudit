import { ERUDIT_BUILD } from '@erudit/index';

export default defineEventHandler(async () => {
    await ERUDIT_BUILD;
    return true;
});