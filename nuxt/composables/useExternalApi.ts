import type { EruditConfig } from 'erudit';
import type { UseFetchOptions } from '#app';

interface ApiRouteData
{
    real: (...args: any[]) => string | { url: string, opts?: UseFetchOptions<any> },
    fake: string,
}

const api = {
    content: {
        fake: '/api/fake/content',
        real: (repository: string, branch: string) => `https://api.github.com/repos/${repository}/branches/${branch}`,
    },
    languages: {
        fake: '/api/fake/shared/languages',
        real: (shared: string) => ({
            url: `https://api.github.com/repos/${shared}/contents/languages.json`,
            opts: {
                headers: { Accept: 'application/vnd.github.v3.raw' },
                responseType: 'text',
                transform: (response: string) => JSON.parse(response),
            },
        }),
    }
} as const satisfies Record<keyof EruditConfig['debug']['fakeApi'], ApiRouteData>;

//
//
//

export default async function<Target extends keyof typeof api, Response>(target: Target, ...options: Parameters<typeof api[Target]['real']>): Promise<any>
{
    const config = await useConfig();
    const useFakeUrl = config.value?.debug?.fakeApi?.[target] ?? import.meta.dev;

    // @ts-expect-error
    const realData = api[target]['real'](...options);

    const url = useFakeUrl ? api[target]['fake'] : typeof realData === 'string' ? realData : realData.url;
    const opts: UseFetchOptions<any> = {
        ...{ key: `external${useFakeUrl ? '-fake' : ''}:${target}` },
        ...(typeof realData === 'string' ? {} : realData.opts),
    };

    // @ts-expect-error
    return useFetch<Response>(url, opts);
}