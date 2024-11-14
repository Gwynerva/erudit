<script lang="ts" setup>
const props = defineProps<{
    paneKey: MajorPaneKey;
}>();

const { getPaneOrder, activePane } = useMajorPane();

const style = computed(() => {
    const thisPaneOrder = getPaneOrder(props.paneKey);
    const activePaneOrder = getPaneOrder(activePane.value);

    return {
        left: `calc(${Math.sign(thisPaneOrder - activePaneOrder)} * var(--wAside))`,
        opacity: thisPaneOrder === activePaneOrder ? 1 : 0,
    }
});
</script>

<template>
    <div :class="$style.paneContent" :style>
        <slot></slot>
    </div>
</template>

<style lang="scss" module>
@use '$/util' as *;

.paneContent
{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    @include transition(left, opacity);
}
</style>