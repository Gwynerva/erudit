<script lang="ts" setup>
let loadingTimeout;

const { activeBook, fetchNav } = await useNavBook();
const { panes, activePane, getPaneOrder } = useNavPane();

const bookNavItem = shallowRef();
provide('book-nav-item', bookNavItem);

watch(activeBook, setupNavPane);
await setupNavPane();

async function setupNavPane()
{
    clearTimeout(loadingTimeout);

    if (activeBook.value)
    {
        loadingTimeout = setTimeout(() => activePane.value = 'loading', 250);
        bookNavItem.value = (await fetchNav(activeBook.value))[0];
        clearTimeout(loadingTimeout);
        activePane.value = 'book';
        return;
    }

    activePane.value = 'global';
}

function paneStyle(paneKey: NavPaneType)
{
    const thisPaneOrder = getPaneOrder(paneKey);
    const activePaneOrder = getPaneOrder(activePane.value);

    return {
        left: `calc(${Math.sign(thisPaneOrder - activePaneOrder)} * var(--wAside))`,
        opacity: thisPaneOrder === activePaneOrder ? 1 : 0,
    }
}
</script>

<template>
    <div :class="$style.paneHolder" :style="{ '--_activePane': getPaneOrder(activePane) }">
        <component v-for="(pane, paneKey) of panes" :is="pane" :class="$style.navPane" :style="paneStyle(paneKey)" />
    </div>
</template>

<style lang="scss" module>
@use '$/util' as *;

.paneHolder
{
    position: relative;
    width: 100%;
    height: 100%;
}

.navPane
{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    @include transition(left, opacity);
}
</style>