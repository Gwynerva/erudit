<script setup lang="ts">
import { pastel } from 'gradient-string';

import { AsideType } from '@scripts/aside';
import { version } from '@/../package.json';
import branding from '@/../textLogo';

const config = await useConfig();
const phrase = await usePhrases('_language_code');

useHead({
    htmlAttrs: {
        lang: phrase._language_code,
        style: config.value.debug?.slowTransition ? `--transitionSpeed: .5s` : null,
    },
    link: [
        { rel: 'icon', href: '/favicon/default.svg' }
    ],
    script: [
        {
            key: 'immediate-js',
            tagPriority: 'critical',
            innerHTML: (await import('@/scripts/_immediate.js?raw')).default,
        }
    ],
    style: [
        {
            key: 'immediate-css',
            tagPriority: 'critical',
            innerHTML: (await import('@/styles/_immediate.css?raw')).default,
        }
    ],
});

if (!config.value.shared)
    delete useMajorPane().panes.language;

const route = useRoute();
const { activePane } = useMajorPane();

//
// Swtiching major pane to match the new route
//

watch(route, () => {
    if (route.path === '/')
        return activePane.value = 'index';

    const pathType = route.path.split('/')[1];
    if (['book', 'group', 'article', 'summary', 'practice'].includes(pathType))
        return activePane.value = 'index';

    return activePane.value = 'pages';
});

if (import.meta.client)
{
    //
    // Theme Switch Watcher
    //

    const { theme, binaryTheme } = useTheme();

    watch(theme, newTheme => {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', binaryTheme.value);
    });

    //
    // Branding
    //

    document.documentElement.before(document.createComment(branding));

    const emojies = ['😂', '❤️', '🤣', '🎉', '🔥', '💖', '👀', '✨', '💗', '💚', '💙', '🎁'];
    const emoji = emojies[Math.floor(Math.random() * emojies.length)];
    console.log(pastel.multiline(branding) + `\nv${version} ${emoji} %cKnowledge in the most convenient form for everyone!\n`, 'font-style: italic; color: color-mix(in srgb, currentColor, transparent 50%)');

    //
    // Ads Setup
    //

    if (config.value.ads && !import.meta.dev)
    {
        const yaScript = document.createElement('script');
        yaScript.setAttribute('src', 'https://yandex.ru/ads/system/context.js');
        yaScript.setAttribute('async', '');
        document.body.appendChild(yaScript);
    }
}
</script>

<template>
    <SiteAside :type="AsideType.Major">
        <AsideMajor />
    </SiteAside>
    <SiteAside :type="AsideType.Minor">Aside Minor.</SiteAside>

    <div :class="$style.mainContainer">
        <div><!-- Phatom aside major --></div>
        <SiteMain><slot></slot></SiteMain>
        <div><!-- Phatom aside minor --></div>
    </div>
</template>

<style lang="scss" module>
@use '$/normalize.scss';
@use '$/default.scss';

@use '$/def/bp';
@use '$/def/z';
@use '$/util' as *;

.mainContainer
{
    --w_asideMajor: 0;
    --w_asideMinor: 0;
    --w_main: 1fr;

    position: relative;
    z-index: z.$main;

    display: grid;
    grid-template-columns: var(--w_asideMajor) var(--w_main) var(--w_asideMinor);

    margin: auto;
    max-width: calc(2 * var(--wAside) + var(--wMainMax));

    @include transition(grid);

    @include bp.above('aside1')
    {
        --w_asideMajor: var(--wAside);
        --w_asideMinor: 0;
    }

    @include bp.above('aside2')
    {
        --w_asideMajor: var(--wAside);
        --w_asideMinor: var(--wAside);
    }
}
</style>