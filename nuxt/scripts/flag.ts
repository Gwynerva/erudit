import type { MasterPhraseKey } from '@/languages/en';
import type { ContentFlag } from 'erudit';

interface FlagData
{
    icon: string;
    title: MasterPhraseKey;
}

export const flagsData: Record<ContentFlag, FlagData> =
{
    //
    // Global Content Flags
    //

    dev: {
        icon: 'construction',
        title: 'flag_dev',
    },

    advanced: {
        icon: 'asterisk',
        title: 'flag_advanced',
    },

    secondary: {
        icon: 'puzzle',
        title: 'flag_secondary',
    },
}