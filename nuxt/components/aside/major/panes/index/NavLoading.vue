<template>
    <div :class="$style.navLoading">
        <Loading />
    </div>
</template>

<style lang="scss" module>
.navLoading
{
    display: flex;
    align-items: center;
    justify-content: center;

    > :global(.EruditIcon)
    {
        font-size: 80px;
    }
}
</style>