<script lang="ts" setup>
defineProps<{
    icon: string;
    label: string;
    level?: number;
    link?: string;
    active?: boolean;
    accent?: boolean;
}>();
</script>

<template>
    <NuxtLink
        :prefetch="false"
        :to="link"
        :class="[$style.treeItem, active && $style.active, accent && $style.accent]"
        :style="{ ['--_level']: level ?? 0 }">
        <Icon :class="$style.icon" :name="icon" />
        <div :class="$style.main">{{ label }}</div>
        <div v-if="$slots.default" :class="$style.after">
            <slot></slot>
        </div>
    </NuxtLink>
</template>

<style lang="scss" module>
@use '$/util' as *;

.treeItem
{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--gap);
    padding: calc(var(--gap) / 2) var(--gap);
    padding-left: calc((var(--_level) + 1) * var(--gap));
    font-size: .95em;
    color: var(--textMuted);
    text-decoration: none;
    cursor: pointer;

    @include transition(background);

    &:hover
    {
        background: var(--bgAccent);
        .icon, .main { color: var(--text); }
    }

    &.active { .icon, .main { color: var(--textBrand); } }
    &.accent { .icon, .main { color: var(--text); } }

    .icon, .main
    {
        @include transition(color);
    }

    .main
    {
        flex: 1;
    }

    .icon, .after
    {
        flex-shrink: 0;
    }

    .icon
    {
        font-size: 18px;
    }
}
</style>