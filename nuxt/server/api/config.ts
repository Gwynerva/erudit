import { ERUDIT_CONFIG } from '@/erudit/config';

export type PublicConfig = Pick<typeof ERUDIT_CONFIG, 'debug' | 'ads' | 'content' | 'shared'>;

export default defineEventHandler<PublicConfig>(() => {
    return {
        debug: ERUDIT_CONFIG.debug,
        ads: ERUDIT_CONFIG.ads,
        content: ERUDIT_CONFIG.content,
        shared: ERUDIT_CONFIG.shared,
    }
});