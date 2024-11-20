export const ERUDIT_PACKAGE_DIR =   process.env.ERUDIT_PACKAGE_DIR as string;
export const ERUDIT_PROJECT_DIR =   process.env.ERUDIT_PROJECT_DIR as string;
export const ERUDIT_BUILD_DIR =     process.env.ERUDIT_BUILD_DIR as string;
export const ERUDIT_TARGETS =       JSON.parse(process.env.ERUDIT_TARGETS || '[]') as string[];

//

export function packageDir(relativePath: string = '')
{
    return ERUDIT_PACKAGE_DIR + relativePath;
}

export function projectDir(relativePath: string = '')
{
    return ERUDIT_PROJECT_DIR + relativePath;
}

export function buildDir(relativePath: string = '')
{
    return ERUDIT_BUILD_DIR + relativePath;
}

export function contentDir(relativePath: string = '')
{
    return ERUDIT_PROJECT_DIR + '/content' + relativePath
}

export function nuxtPath(relativePath: string = '')
{
    return packageDir('/nuxt' + relativePath);
}