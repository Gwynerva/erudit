import type { ContentType } from 'erudit';

const contentRoute = reactive<{ type: ContentType, id: string }>({
    type: null,
    id: null,
});

export default function()
{
    setup();
    return contentRoute;
}

let watcher: any;

function setup()
{
    if (import.meta.server)
    {
        // On server we always just recalculate values
        const route = useRoute();
        updateValues(route.path);
        return;
    }

    // On client we setup watcher and recalculate values on route change

    if (watcher)
        return;

    const route = useRoute();
    watcher = watch(route, () => updateValues(route.path), { immediate: true });
}

function updateValues(routePath: string)
{
    const match = routePath.match(/\/(.+?)\/(.+)/);
    const unset = () => contentRoute.type = contentRoute.id = null;

    if (!match || !match[1] || !match[2])
    {
        unset();
        return;
    }

    switch (match[1])
    {
        case 'article':
        case 'summary':
        case 'practice':    contentRoute.type = 'topic'; break;
        case 'group':       contentRoute.type = 'group'; break;
        case 'book':        contentRoute.type = 'book'; break;
        default:            unset(); return;
    }

    contentRoute.id = match[2];
}