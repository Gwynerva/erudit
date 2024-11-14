import { LANGUAGE_CONTEXT } from '@erudit/language';

export default defineEventHandler(() => {
    const strLanguageContext: Record<string, string> = {};

    for (const [key, value] of Object.entries(LANGUAGE_CONTEXT))
        strLanguageContext[key] = `return ` + value.toString();

    return strLanguageContext;
});