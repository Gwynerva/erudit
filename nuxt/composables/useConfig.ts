import type { PublicConfig } from '@/server/api/config'

export const useConfig = async () =>
{
    const config = useState<PublicConfig>('config', () => shallowRef());
    config.value ||= await $fetch('/api/config');

    return config;
}