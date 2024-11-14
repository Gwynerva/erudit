import defu from 'defu';

export interface EruditConfig
{
    /**
     * Debug mode. If true, will log more build information to the console.
     * It also makes the behavior of the site more illustrative.
     */
    debug: boolean;

    /** Language of the generated site. */
    language: string;

    /** GitHub Repository */
    github: {
        repository: string;
        branch: string;
    };

    /** Enable ads banners. */
    ads: {
        leftBlockId?: string;
        bottomBlockId?: string;
    }
}

export const defaultConfig: EruditConfig =
{
    debug: false,
    language: 'en',
    github: null,
    ads: {},
}

export function defineEruditConfig(eruditConfig: Partial<EruditConfig>)
{
    return defu(eruditConfig, defaultConfig);
}