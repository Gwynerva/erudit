<script lang="ts" setup>
import type { ContentFlags } from 'erudit';
import { flagsData } from '@/scripts/flag';

defineProps<{ flags: ContentFlags }>();

const phrases = Object.values(flagsData).map(data => data.title);
const phrase = await usePhrases(...phrases);
</script>

<template>
    <div :class="$style.flags">
        <Icon
            v-for="flag of Object.keys(flags)"
            :name="flagsData[flag].icon"
            :title="phrase[flagsData[flag].title]"
            :class="$style.flag" />
    </div>
</template>

<style lang="scss" module>
@use '$/util' as *;

.flags
{
    display: flex;
    align-items: center;
    gap: var(--gapSmall);
}

.flag
{
    cursor: help;
    font-size: 16px;
    color: var(--textDimmed);
    opacity: .65;
    @include transition(opacity);

    &:hover { opacity: 1; }
}
</style>