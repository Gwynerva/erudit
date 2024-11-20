import type { FNavBook } from '@/shared/frontNav';

export default async function()
{
    await preparePayload();
    const activeBook = prepareActiveBook();

    return {
        data: getNavBook(),
        fetchNav,
        activeBook,
    }
}

//
// Active book
//

let watcher: any;

function prepareActiveBook()
{
    const activeBookId = useState<string | null>('active-book', () => undefined);

    if (import.meta.server)
    {
        const navBook = getNavBook();
        const contentRoute = useContentRoute();
        activeBookId.value = getActiveBookId(contentRoute.id, navBook.ids);
        return activeBookId;
    }

    if (watcher)
        return activeBookId;

    const navBook = getNavBook();
    const contentRoute = useContentRoute();
    watcher = watch(contentRoute, () => activeBookId.value = getActiveBookId(contentRoute.id, navBook.ids), { immediate: true });

    return activeBookId;
}

function getActiveBookId(contentId: string, bookIds: string[])
{
    if (!contentId || bookIds.length === 0) return null;
    return bookIds.find(bookId => contentId.indexOf(bookId) === 0) || null
}

//
// Storage
//

interface NavBook
{
    ids: string[];
    nav: Record<string, FNavBook>;
}

const KEY = 'nav-book';

function setNavBook(value: NavBook)
{
    const nuxtApp = useNuxtApp();
    nuxtApp.payload.data[KEY] = nuxtApp.static.data[KEY] = value;
}

function getNavBook(): NavBook
{
    const nuxtApp = useNuxtApp();
    return nuxtApp.static.data[KEY] || nuxtApp.payload.data[KEY];
}

async function preparePayload()
{
    if (getNavBook())
        return;

    const navBook = {
        ids: await $fetch('/api/nav/bookIds'),
        nav: {},
    };

    setNavBook(navBook);
}

async function fetchNav(bookId: string)
{
    const navBook = getNavBook();

    if (!navBook.ids.includes(bookId))
        return null;

    if (!(bookId in navBook.nav))
    {
        //const apiUrl = `/api/nav/book/${bookId}`;
        //prerenderRoutes(apiUrl);
        navBook.nav[bookId] = await $fetch(`/api/nav/book/${bookId}`);
    }

    return navBook.nav[bookId];
}