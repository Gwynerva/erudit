<script lang="ts" setup>
const config = await useConfig();
const phrase = await usePhrases('_language_code', 'content');

const forceLoad = false;

const secondary = ref('???');

if ((forceLoad || !import.meta.dev) && config.value.github)
{
    const { data } = await useFetch<any>(`https://api.github.com/repos/${config.value.github.repository}/branches/${config.value.github.branch}`, { key: 'gh-content-main-branch' });

    const strDate = data.value?.commit?.commit?.author?.date;

    if (strDate)
        secondary.value = new Date(strDate).toLocaleString(phrase._language_code, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
}
</script>

<template>
    <AsideListItem v-if="config.github" :link="`https://github.com/${config.github.repository}`" target="_blank" icon="write" :main="phrase.content + ':'" :secondary />
</template>