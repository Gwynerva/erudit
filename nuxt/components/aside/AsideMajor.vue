<script lang="ts" setup>
import SiteInfo from './major/SiteInfo.vue';
import PaneSwitch from './major/PaneSwitch.vue';
import PaneContent from './major/PaneContent.vue';

const { panes } = useMajorPane();

const config = await useConfig();
</script>

<template>
    <div :class="$style.asideInner">
        <SiteInfo />
        <PaneSwitch />
        <div :class="$style.paneHolder">
            <PaneContent v-for="(pane, paneKey) of panes" :paneKey>
                <component :is="pane.content" />
            </PaneContent>
        </div>
        <AdsLeftBanner v-if="config.ads.leftBlockId" />
    </div>
</template>

<style lang="scss" module>
.asideInner
{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.paneHolder
{
    flex: 1;
    position: relative;
    overflow-x: hidden;
}
</style>