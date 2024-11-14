import { ERUDIT_CONFIG } from '@/erudit/config';

export type PublicConfig = Pick<typeof ERUDIT_CONFIG, 'debug' | 'ads' | 'github'>;

export default defineEventHandler<PublicConfig>(() => {
    return {
        debug: ERUDIT_CONFIG.debug,
        ads: ERUDIT_CONFIG.ads,
        github: ERUDIT_CONFIG.github,
    }
});