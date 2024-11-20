<script lang="ts" setup>
import type { MajorNavState } from '@/scripts/aside/major/nav';
import type { FNavTopic } from '@/shared/frontNav';
import FNavFlags from './FNavFlags.vue';

const props = defineProps<{ navItem: FNavTopic }>();
const navState = inject('navState') as MajorNavState;
const active = computed(() => navState[props.navItem.id].value === 'active');
</script>

<template>
    <TreeItem
        icon="file-outline"
        :active
        :label="navItem.label"
        :level="navItem.level"
        :link="`/${navItem.part}/${navItem.id}`">
        <FNavFlags v-if="navItem.flags" :flags="navItem.flags" />
    </TreeItem>
</template>