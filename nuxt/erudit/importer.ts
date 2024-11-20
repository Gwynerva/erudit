import { createJiti } from 'jiti';
import { packageDir } from './const';

const jiti = createJiti(packageDir('nuxt/erudit'));

export async function IMPORT(...args: Parameters<typeof jiti.import>)
{
    return jiti.import(...args);
}