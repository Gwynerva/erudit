<script lang="ts" setup>
const config = await useConfig();
</script>

<template>
    <main :class="$style.main">
        <slot></slot>

        <AdsBottomBanner v-if="config.ads.bottomBlockId" />
    </main>
</template>

<style lang="scss" module>
@use '$/def/bp';

.main
{
    min-height: 100dvh;
    background: var(--bgMain);
    padding: var(--_pMainY) 0;
    //height: 10000px;

    --_pMainBase: var(--gapBig);
    --_pMainX: var(--_pMainBase);
    --_pMainY: calc(var(--_pMainBase) / 2);

    @include bp.below('mobile')
    {
        --_pMainBase: var(--gap);
    }
}
</style>