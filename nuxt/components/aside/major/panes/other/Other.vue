<script lang="ts" setup>
import PaneContentScroll from '../../PaneContentScroll.vue';
import ItemTheme from './ItemTheme.vue';
import ItemContent from './ItemContent.vue';
import ItemGenerator from './ItemGenerator.vue';

const config = await useConfig();
</script>

<template>
    <PaneContentScroll>
        <ItemTheme />
        <ItemContent v-if="config.content" />
        <ItemGenerator />
    </PaneContentScroll>
</template>