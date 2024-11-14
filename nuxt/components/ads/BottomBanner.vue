<script lang="ts" setup>
const config = await useConfig();
</script>

<template>
    <AdsBannerTemplate :bannerId="config.ads.bottomBlockId" :class="$style.darkMagicBottom" />
</template>

<style lang="scss" module>
@use '$/def/bp';
@use '$/partials/darkMagic';

.darkMagicBottom
{
    padding: var(--_pMainY) var(--_pMainX);
    max-height: 300px;

    @include darkMagic.replacer
    {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--gapBig);
        font-size: 1.3em;

        :global(.EruditIcon)
        {
            font-size: 60px;
        }

        @include bp.below('mobile')
        {
            flex-direction: column;
            gap: var(--gap);
            font-size: 1em;
            text-align: center;

            :global(.EruditIcon)
            {
                font-size: 68px;
            }
        }
    }
}
</style>