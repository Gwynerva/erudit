export default defineEventHandler(() => {
    return JSON.stringify({
        en: {
            name: 'English',
            link: 'https://en.omath.net',
        },
        ru: {
            name: 'Русский',
            link: 'https://omath.ru',
        },
    });
});