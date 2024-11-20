<script lang="ts" setup>
import PaneContentScroll from '../../PaneContentScroll.vue';
import FNav from './fnav/FNav.vue';

const phrase = await usePhrases('no_content');
const { data: globalNav } = await useFetch('/api/nav/global', { key: 'nav-global', deep: false });
</script>

<template>
    <PaneContentScroll>
        <FNav v-if="globalNav" :nav="globalNav" />
        <div v-else :style="{ padding: 'var(--gap)', color: 'var(--textMuted)', textAlign: 'center' }">
            {{ phrase.no_content }}
        </div>
    </PaneContentScroll>
</template>