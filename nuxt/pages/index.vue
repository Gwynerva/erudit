<script lang="ts" setup>
const phrase = await usePhrases(
    'open_math',
    'index_meta_desc',
);

useHead({
    link: [
        { rel: 'icon', href: '/favicon/default.svg' }
    ],
});

useSeoMeta({
    title: phrase.open_math,
    description: phrase.index_meta_desc,
});
</script>

<template>
    <div style="padding: var(--gapBig)">
    <h1>Erudit Site</h1>
    <p>Подгружать в качестве новостей последние 30 коммитов мейн ветке.</p>
    <br>
    <p>Брать информацию о языках и другие межрепозитарные данные из одного связующего глобального интер-репозитория. Например shared.omath (а там и языки и прочие данные, общие для всех). Тогда можно и в конфиге одну строчку указывать на интерпроект.</p>
    <br>
    <p>Наследуемая декорация. Можно decoration.svg кинуть в любое место навигации и оно будет работать на все низлежащие категории и темы, если не будет переопределено ниже.</p>
    <br>
    <p>Сделать основную область сжимаемой до пределов старого OMath и только потом убирать правый сайдбар. Слишком жирно как-то.</p>
    </div>
</template>