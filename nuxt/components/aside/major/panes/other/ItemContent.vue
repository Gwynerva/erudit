<script lang="ts" setup>
const config = await useConfig();
const phrase = await usePhrases('_language_code', 'content');

const secondary = ref<string>(null);

const { data: ghResponse } = await useExternalApi('content', config.value.content.repository, config.value.content.branch);
const strDate = ghResponse.value?.commit?.commit?.author?.date;

if (strDate)
{
    secondary.value = new Date(strDate).toLocaleString(phrase._language_code, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
else console.warn(`Bad content last commit date repsonse: ${strDate}`)
</script>

<template>
    <AsideListItem
        v-if="secondary"
        :link="`https://github.com/${config.content.repository}`"
        target="_blank"
        icon="write"
        :main="phrase.content + ':'"
        :secondary />
</template>