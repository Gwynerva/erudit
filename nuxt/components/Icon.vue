<script lang="ts" setup>
defineProps<{ name: string; }>();

const breakCacheHash = useState('icon-hash', () => Math.random().toString(36).slice(2, 7));
</script>

<template>
    <div class="EruditIcon" :data-icon="name">
        <svg>
            <use :href="`/icons.svg?${breakCacheHash}#${name}`" fill="currentColor" />
        </svg>
    </div>
</template>

<style lang="scss">
.EruditIcon
{
    line-height: 0;

    > svg
    {
        color: currentColor;
        width: 1em;
        height: 1em;
    }
}
</style>