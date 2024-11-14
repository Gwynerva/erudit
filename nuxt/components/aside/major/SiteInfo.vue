<script lang="ts" setup>
const phrase = await usePhrases(
    'site_info_title',
    'site_info_slogan',
);
</script>

<template>
    <section :class="$style.siteInfo">
        <NuxtLink to="/" :class="$style.logo">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 135 135">
                <defs>
                    <linearGradient id="logoGradient" x1="-884.9" y1="604.51" x2="-883.9" y2="604.51" gradientTransform="translate(119461.5 81676.5) scale(135 -135)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#0aa2f4" />
                        <stop offset="1" stop-color="#1976d7" />
                    </linearGradient>
                </defs>
                <circle :class="$style.circle" cx="67.5" cy="67.5" r="67.5" style="fill:url(#logoGradient);" />
                <path :class="$style.cut" d="M67.9,0C39.8,9.5,19.5,36.1,19.5,67.5s20.3,58,48.4,67.5c28.2-9.5,48.4-36.1,48.4-67.5S96.1,9.5,67.9,0ZM86.5,45.18c-1.27,0-1.91.11-2.22.2-3.05,1.22-5.34,3.78-6.81,7.62-5.14,17.85-7.74,28.38-7.74,31.32,0,2.05.58,3.46,1.77,4.3,1.27.9,2.62,1.33,4.12,1.33,3,0,6.03-1.3,8.99-3.86,2.99-2.58,5.05-5.8,6.13-9.56v-.02c.36-1.11.73-1.65,1.26-1.82.22-.07.67-.16,2.24-.28h.05s.52,0,.52,0c2.32,0,2.67,1.07,2.67,1.7,0,.1,0,.2-.28,1.5v.06c-1.43,4.75-4.2,9.02-8.26,12.68-4.1,3.69-8.93,5.57-14.36,5.57-5.93,0-10.56-2.4-13.78-7.15-3.53,4.66-7.61,7.02-12.15,7.02h-.78c-4.44,0-7.68-1.15-9.63-3.43-1.92-2.24-2.93-4.65-3.03-7.17v-.03c0-2.8.9-5.11,2.68-6.87,1.78-1.76,3.91-2.66,6.35-2.66,5.21,0,6.3,3.19,6.3,5.86,0,1.8-.58,3.4-1.73,4.75-1.12,1.32-2.18,2.19-3.25,2.64-.2.09-.38.16-.54.23.37.16.8.33,1.28.51.75.28,1.47.39,2.13.32h.08c2.87,0,5.3-1.69,7.42-5.16.74-1.24,1.72-3.98,2.9-8.13,1.2-4.22,2.42-8.66,3.63-13.19,1.2-4.53,1.9-7.23,2.07-8.03.42-2.13.63-3.69.63-4.62,0-2.06-.54-3.47-1.66-4.31-1.18-.89-2.48-1.32-3.97-1.32-3.26,0-6.38,1.26-9.25,3.74-2.9,2.5-4.96,5.75-6.13,9.66-.17.7-.44,1.51-1.13,1.73-.22.07-.67.16-2.24.28h-.05s-2.1,0-2.1,0l-.21-.2c-.68-.64-1.01-1.25-1.01-1.87v-.13c.64-3.54,3.05-7.66,7.19-12.22,4.18-4.62,9.42-7,15.57-7.09,3.15,0,6.07.77,8.68,2.3,2.24,1.31,4.01,2.93,5.27,4.83,3.63-4.73,8.02-7.13,13.04-7.13,3.35,0,6.29.96,8.74,2.84,2.5,1.92,3.82,4.54,3.91,7.77v.02c0,2.53-.67,4.61-1.98,6.21-1.32,1.6-2.58,2.55-3.86,2.93-1.18.34-2.26.52-3.18.52-1.81,0-3.33-.51-4.49-1.52-1.2-1.04-1.81-2.41-1.81-4.09,0-3.69,1.92-6.35,5.7-7.92-.88-.43-2.11-.64-3.68-.64Z" />
            </svg>
        </NuxtLink>
        <h1 :class="$style.title"><NuxtLink to="/">{{ phrase.site_info_title }}</NuxtLink></h1>
        <div :class="$style.description">{{ phrase.site_info_slogan }}</div>
    </section>
</template>

<style lang="scss" module>
@use '$/util' as *;

.siteInfo
{
    display: grid;
    grid-template-columns: 50px auto;
    grid-template-rows: auto auto;
    column-gap: var(--gap);
    padding: var(--gap) 0 calc(var(--gap) / 2);
    margin: auto;
}

.logo, .title, .description
{
    display: block;
    align-self: center;
}

.title
{
    font-weight: bold;
    font-size: 1.25em;
    color: var(--text);

    a { @include link; }
}

.description
{
    color: var(--textMuted);
}

.logo
{
    grid-row: 1 / -1;

    width: 50px;
    height: 50px;

    --rotationDuration: 2.5s;

    .cut
    {
        fill: var(--bgAside);
    }

    .circle
    {
        transform-origin: 50% 50%;
        animation: logoRotation var(--rotationDuration) linear infinite;
    }
}

@keyframes logoRotation
{
    from { transform: rotate(0); }
    to   { transform: rotate(360deg); }
}
</style>