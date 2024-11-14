export type Phrase = string | ((...args: any[]) => string);
export type Language = Record<string, Phrase>;

export enum PhraseType
{
    String = 'string',
    Function = 'function',
}

export interface RawPhrase
{
    type: PhraseType;
    value: string | null;
}

export function defineLanguage<ParentLanguage extends Language>(language: ParentLanguage)
{
    return language;
}