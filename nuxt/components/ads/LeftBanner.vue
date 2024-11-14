<script lang="ts" setup>
const config = await useConfig();
</script>

<template>
    <AdsBannerTemplate :bannerId="config.ads.leftBlockId" :class="$style.darkMagicLeft" />
</template>

<style lang="scss" module>
@use '$/partials/darkMagic';
@use '$/util' as *;

.darkMagicLeft
{
    max-height: 300px;
    padding: var(--gap);
    border-top: 1px solid var(--border);
    @include transition(max-height);

    @media (max-height: 1080px) { max-height: 200px; }

    @media (max-height: 700px)
    {
        max-height: 100px;
        :global(.EruditIcon) { display: none; }
    }

    @include darkMagic.replacer
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap);
        text-align: center;
        font-size: .95em;

        :global(.EruditIcon)
        {
            font-size: 46px;
        }
    }
}
</style>