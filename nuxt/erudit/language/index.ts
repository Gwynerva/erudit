import type { Language } from '@/languages/_language';

export let LANGUAGE: Language;
export let LANGUAGE_CONTEXT: object;

export function setLanguage(languageModule: any)
{
    const { default: phrases, ...context } = {...languageModule};

    LANGUAGE = phrases;
    LANGUAGE_CONTEXT = context;
}