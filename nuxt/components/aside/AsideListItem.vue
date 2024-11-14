<script lang="ts" setup>
defineProps<{
    link?: string;
    icon?: string;
    main?: string;
    active?: boolean;
    secondary?: string;
}>();

const nuxtLink = defineNuxtLink({});
</script>

<template>
    <component :is="link ? nuxtLink : 'div'" :to="link" :class="[$style.asideListItem, active ? $style.active : '']">
        <slot>
            <Icon v-if="icon" :name="icon" />
            <div :class="$style.main">{{ main }}</div>
            <div v-if="secondary" :class="$style.secondary">{{ secondary }}</div>
        </slot>
    </component>
</template>

<style lang="scss" module>
@use '$/util' as *;

.asideListItem
{
    display: flex;
    align-items: center;
    gap: var(--gap);
    padding: var(--gap);
    height: 60px;
    border-bottom: 1px solid var(--border);
    color: var(--textMuted);
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    @include transition(color, background);

    &:hover
    {
        color: var(--text);
        background: var(--bgAccent);
    }

    :global(.EruditIcon)
    {
        font-size: 20px;
    }

    .secondary
    {
        font-weight: 500;
        color: var(--textDimmed);
    }

    :global(.EruditIcon),
    .main
    {
        @include transition(color);
    }

    &.active
    {
        :global(.EruditIcon),
        .main
        {
            color: var(--textBrand);
        }
    }
}
</style>