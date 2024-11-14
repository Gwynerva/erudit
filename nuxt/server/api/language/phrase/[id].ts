import { PhraseType, type RawPhrase } from '@/languages/_language'
import masterLanguage, { MasterPhraseKey } from '@/languages/en';
import { LANGUAGE } from '@erudit/language';

export default defineEventHandler(event => {
    const phraseId = getRouterParam(event, 'id') as MasterPhraseKey;
    const masterPhrase = masterLanguage[phraseId];
    const phrase = LANGUAGE[phraseId];

    if (!masterPhrase)
        throw createError({
            statusCode: 404,
            statusText: `Phrase '${phraseId}' not found in master language!`,
         });

    const type = typeof masterPhrase === 'function' ? PhraseType.Function : PhraseType.String;
    const value = phrase ? typeof masterPhrase === 'function' ? `return ${phrase.toString()}` : phrase.toString() : null;

    const response: RawPhrase = {
        type,
        value,
    }

    return response;
});