<script lang="ts" setup>
defineProps<{
    paneKey: MajorPaneKey;
    icon: string;
}>();

const { activePane } = useMajorPane();
</script>

<template>
    <button @click="activePane = paneKey" :class="[$style.paneSwtichButton, paneKey === activePane ? $style.active : '']">
        <Icon :name="icon" />
    </button>
</template>

<style lang="scss" module>
@use '$/util' as *;

.paneSwtichButton
{
    --_padding: calc(var(--gapSize) / 2);

    position: relative;
    padding: var(--_padding);
    color: var(--textMuted);
    background: transparent;
    border: none;
    cursor: pointer;
    @include transition(color);

    &::after
    {
        content: '';
        position: absolute;
        left: var(--_padding);
        right: var(--_padding);
        bottom: -1px;
        height: 3px;
        background: transparent;
        @include transition(background);
    }

    &:hover, &.active
    {
        color: var(--text);
        &::after { background: var(--border); }
    }

    :global(.EruditIcon)
    {
        display: grid;
        place-items: center;
        width: var(--buttonSize);
        height: var(--buttonSize);
        font-size: 22px;
    }
}
</style>