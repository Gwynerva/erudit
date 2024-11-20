import { defineLanguage } from './_language';
import type { MasterLanguage } from './en';

export default defineLanguage<MasterLanguage>({
    _language: 'Русский',
    _language_code: 'ru',

    open_math: 'Открытая математика',
    index_meta_desc: 'Свободный онлайн-учебник по математике, поддерживаемый сообществом. Понятная и подробная теория с примерами, краткие конспекты, множество интересных задач на отработку!',
    site_info_title: 'Математика',
    site_info_slogan: 'Понятно и подробно',
    index: 'Оглавление',
    pages: 'Страницы',
    search: 'Поиск',
    language: 'Язык',
    other: 'Другое',
    ads_replacer: 'Помогите нам улучшать проект.<br><strong>Включите показ рекламы!</strong>',
    theme: 'Тема',
    theme_system: 'Системная',
    theme_light: 'Светлая',
    theme_dark: 'Темная',
    content: 'Контент',
    generator: 'Генератор',
    main_page: 'Главная страница',
    members: 'Участники',
    add_translation: 'Добавить перевод',
    no_content: 'Содержмое отсутствует',
    flag_dev: 'В разработке',
    flag_advanced: 'Продвинутый уровень',
    flag_secondary: 'Доп. материал',
    to_index: 'К оглавлению',
    about_book: 'Об учебнике',
});

export function m(number: number, one: string, two: string, five: string, includeNumber = true)
{
    const text = [five, one, two, two, two, five][number % 100 > 10 && number % 100 < 20 ? 0 : Math.min(number % 10, 5)];
    return includeNumber? `${number} ${text}` : text;
}