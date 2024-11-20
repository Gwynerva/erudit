export interface EruditConfig
{
    /** Debug options. */
    debug: Partial<{
        /** Log more detailed build information to the console. */
        deepLogs: boolean;

        /** Slower CSS transition speed to make them more illustrative. */
        slowTransition: boolean;

        /** Replace actual API calls to external sites with fake ones to prevent exceeding rate limitations and make calls faster. */
        fakeApi: Partial<{
            content: boolean;
            languages: boolean;
        }>;
    }>;

    /** Language of the generated site. */
    language: string;

    /** GitHub repository corresponding to this project. */
    content: {
        repository: string;
        branch: string;
    }

    /** GitHub shared repository for language settings and more. */
    shared: string;

    /**
     * List of paths relative to `books/` directory which will be scanned.
     * Scanning will be limited to these paths and their subdirectories.
     *
     * If empty, all content within `books/` will be scanned.
     *
     * @example ['1-combinatorics', '5-geometry/3-sum-of-angles']
     */
    targets: string[];

    /** Enable ads banners. */
    ads: {
        leftBlockId?: string;
        bottomBlockId?: string;
    }
}

export const defaultConfig: EruditConfig =
{
    debug: null,
    language: 'en',
    content: null,
    shared: null,
    targets: [],
    ads: {},
}

export function defineEruditConfig(eruditConfig: Partial<EruditConfig>)
{
    return eruditConfig;
}