<script lang="ts" setup>
import type { FNavBook } from '@/shared/frontNav';
import PaneContentScroll from '../../PaneContentScroll.vue';
import FNav from './fnav/FNav.vue';
import FNavFlags from './fnav/FNavFlags.vue';

const contentRoute = useContentRoute();
const pharse = await usePhrases('to_index', 'about_book');
const book = inject('book-nav-item') as Ref<FNavBook>;
const { activePane } = useNavPane();

const aboutActive = computed(() => {
    return contentRoute.id === book.value.id;
});
</script>

<template>
    <div>
        <div v-if="book">
            <PaneContentScroll>
                <div :class="$style.bookHeader">
                    <div :class="$style.title">{{ book.label }}</div>
                    <FNavFlags v-if="book.flags" :flags="book.flags" />
                </div>
                <FNav :nav="book.children">
                    <template v-slot:before>
                        <TreeItem icon="arrow-left" :label="pharse.to_index" @click="activePane = 'global'" />
                        <TreeItem icon="info" :label="pharse.about_book" :active="aboutActive" :link="`/book/${book.id}`" />
                    </template>
                </FNav>
            </PaneContentScroll>
        </div>
        <div v-else></div>
    </div>
</template>

<style lang="scss" module>
.bookHeader
{
    display: flex;
    align-items: center;
    padding: var(--gap);
    border-bottom: 1px solid var(--border);

    .title
    {
        flex: 1;
        font-weight: 500;
        color: var(--text);
    }

    .flags
    {
        flex-shrink: 0;
    }
}
</style>