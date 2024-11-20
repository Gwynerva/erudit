import { PhraseType } from '@/languages/_language';
import type { default as masterLanguage, MasterPhraseKey } from '@/languages/en';

const context: Record<string, Function> = {};
const funcPhrases: Record<string, Function> = {};

const setToPayload = (key: string, value: any) =>
{
    const nuxtApp = useNuxtApp();
    nuxtApp.payload.data[key] = nuxtApp.static.data[key] = value;
}

const getFromPayload = (key: string) =>
{
    const nuxtApp = useNuxtApp();
    return nuxtApp.static.data[key] || nuxtApp.payload.data[key];
}

export default async function<TPhraseIds extends MasterPhraseKey[]>(...phraseIds: TPhraseIds)
{
    await preparePayload();

    const language = getFromPayload('language');

    const phraseCaller = {};

    for (const phraseId of phraseIds)
    {
        const apiRoute = `/api/language/phrase/${phraseId}`;

        prerenderRoutes(apiRoute);
        const rawPhrase = (language.phrases[phraseId] ||= await $fetch(apiRoute));
        const missingText = `{{ ${phraseId} }}`;

        if (rawPhrase.type === PhraseType.String)
            phraseCaller[phraseId] = rawPhrase.value ?? missingText;
        else
        {
            // Create and cache phrase function if it doesn't exist yet
            funcPhrases[phraseId] ||= rawPhrase.value ? new Function(rawPhrase.value as string).bind(context)() : null;
            phraseCaller[phraseId] = funcPhrases[phraseId] ?? (() => missingText);
        }
    }

    type PhraseCaller = { [Key in TPhraseIds[number]]: (typeof masterLanguage)[Key] };
    return phraseCaller as PhraseCaller;
}

async function preparePayload()
{
    if (getFromPayload('language'))
        return;

    const language = {
        context: await $fetch('/api/language/context'),
        phrases: {},
    };

    setToPayload('language', language);

    for (const [funcName, strFunc] of Object.entries(language.context))
        context[funcName] = new Function(strFunc)();
}