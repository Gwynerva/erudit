<script lang="ts" setup>
import type { MajorNavState } from '@scripts/aside/major/nav';
import type { FNavBook } from '@/shared/frontNav';
import FNavFlags from './FNavFlags.vue';

const props = defineProps<{ navItem: FNavBook }>();
const { activeBook } = await useNavBook();
const { activePane } = useNavPane();
const navState = inject('navState') as MajorNavState;
const active = computed(() => navState[props.navItem.id].value !== null);

function bookClick()
{
    // Switch to book pane if possible
    if (activeBook.value === props.navItem.id)
        activePane.value = 'book';
}
</script>

<template>
    <TreeItem
        icon="book-outline"
        :label="navItem.label"
        :level="navItem.level"
        :link="active ? null : `/book/${navItem.id}`"
        @click="bookClick"
        :active>
        <FNavFlags v-if="navItem.flags" :flags="navItem.flags" />
    </TreeItem>
</template>