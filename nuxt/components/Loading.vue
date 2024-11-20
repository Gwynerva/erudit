<template>
    <Icon :class="$style.loading" name="logo" />
</template>

<style lang="scss" module>
.loading
{
    color: var(--textDimmed);
    font-size: 30px;
    animation: loading 500ms infinite ease-in-out alternate;
}

@keyframes loading
{
    from { opacity: 1 }
    to { opacity: .5; }
}
</style>