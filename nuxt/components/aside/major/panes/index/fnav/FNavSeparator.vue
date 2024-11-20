<script lang="ts" setup>
import type { MajorNavState } from '@/scripts/aside/major/nav';
import type { FNavSeparator } from '@/shared/frontNav';
import FNavItem from './FNavItem.vue';
import FNavFlags from './FNavFlags.vue';

const props = defineProps<{ navItem: FNavSeparator }>();
const navState = inject('navState') as MajorNavState;

const active = ref(false);
const accent = ref(false);

watch(navState[props.navItem.id], newState => {
    active.value = newState === 'active';
    accent.value = newState === 'activePart';
}, { immediate: true});
</script>

<template>
    <div>
        <NuxtLink
            :to="`/group/${navItem.id}`"
            :class="[$style.header, active && $style.active, accent && $style.accent]"
            :prefetch="false">
            <div :class="$style.label">{{ navItem.label }}</div>
            <FNavFlags :class="$style.flags" v-if="navItem.flags" :flags="navItem.flags" />
        </NuxtLink>
        <FNavItem v-for="childItem of navItem.children" :navItem="childItem" />
    </div>
</template>

<style lang="scss" module>
@use '$/util' as *;

.header
{
    display: flex;
    gap: var(--gap);
    padding: calc(var(--gap) / 2) var(--gap);
    text-decoration: none;
    @include transition(background);

    .label
    {
        flex: 1;
        font-weight: 600;
        font-size: .95em;
        color: var(--textDimmed);
        @include transition(color);
    }

    .flags
    {
        flex-shrink: 0;
    }

    &:hover { background: var(--bgAccent); }
    &:hover:not(.active) .label { color: var(--text); }

    &.active .label { color: var(--textBrand); }
    &.accent .label { color: var(--textMuted); }
}
</style>