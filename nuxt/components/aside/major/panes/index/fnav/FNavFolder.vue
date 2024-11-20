<script lang="ts" setup>
import type { FNavFolder } from '@/shared/frontNav';
import type { MajorNavState } from '@/scripts/aside/major/nav';
import FNavItem from './FNavItem.vue';
import FNavFlags from './FNavFlags.vue';

const props = defineProps<{ navItem: FNavFolder }>();
const navState = inject('navState') as MajorNavState;

const active = ref(false);
const accent = ref(false);

watch(navState[props.navItem.id], newState => {
    active.value = newState === 'active';
    accent.value = newState === 'activePart';
}, { immediate: true});

const visible = computed(() => active.value || accent.value);
</script>

<template>
    <div>
        <TreeItem
            :icon="`folder${visible ? '-open' : ''}`"
            :link="`/group/${navItem.id}`"
            :label="navItem.label"
            :active
            :accent
            :level="navItem.level">
            <FNavFlags v-if="navItem.flags" :flags="navItem.flags" />
        </TreeItem>

        <div :class="[$style.groupBody, visible ? $style.visible : '']">
            <div>
                <FNavItem v-for="childItem of navItem.children" :navItem="childItem" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '$/util' as *;
@use '$/partials/fnav';

.groupBody
{
    overflow: hidden;
    height: 0;
    @include transition(height);

    &.visible
    {
        height: auto;
    }
}
</style>