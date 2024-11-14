<script lang="ts" setup>
const props = defineProps<{
    bannerId: string;
}>();

const { getElementId, registerBanner } = useDarkMagic();
const phrase = await usePhrases('ads_replacer', '_language_code');

onMounted(() => {
    registerBanner(props.bannerId);
});
</script>

<template>
    <section :class="$style.darkMagicContainer">
        <div :id="getElementId(bannerId)">
            <div :class="$style.darkMagicReplacer">
                <Icon name="pirate" :class="$style.icon" />
                <div :class="$style.disabledText" v-html="phrase.ads_replacer"></div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" module>
@use '$/util' as *;

.darkMagicContainer
{
    height: 100%;

    > div
    {
        width: 100%;
        height: 100%;
    }
}

.darkMagicReplacer
{
    height: 100%;
    width: 100%;
    background: var(--bgAccent);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,.1) inset;
    color: var(--textMuted);

    @include dark
    {
        box-shadow: 0px 0px 3px 1px rgba(white,.025) inset;
    }
}
</style>