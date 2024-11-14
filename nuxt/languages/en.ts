import { defineLanguage } from './_language';

const masterLanguage = defineLanguage({
    _language: 'English',
    _language_code: 'en',

    open_math: 'Open Math',
    index_meta_desc: 'Open online math book supported by the community. Clear and detailed theory with examples, short summaries, a lot of interesting problems to practice!',
    site_info_title: 'Mathematics',
    site_info_slogan: 'Clear. Detailed. Open.',
    index: 'Index',
    pages: 'Pages',
    search: 'Search',
    language: 'Language',
    other: 'Other',
    ads_replacer: 'Help us develop the project.<br><strong>Disable your ads blocker!</strong>',
    theme: 'Theme',
    theme_system: 'System',
    theme_light: 'Light',
    theme_dark: 'Dark',
    content: 'Content',
    generator: 'Generator',
    main_page: 'Main page',
    members: 'Members',
    add_translation: 'Add translation',
});

export function m(number: number, one: string, few: string, includeNumber = true)
{
    const text = number === 1 ? one : few;
    return includeNumber ? `${number} ${text}` : text;
}

export type MasterLanguage = Partial<typeof masterLanguage>;
export type MasterPhraseKey = keyof MasterLanguage;

export default masterLanguage;