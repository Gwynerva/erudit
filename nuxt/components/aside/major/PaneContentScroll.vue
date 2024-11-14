<template>
    <div :class="$style.paneContentScroll">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '$/util' as *;

.paneContentScroll
{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    direction: rtl;
    @include scroll;

    > div
    {
        width: 100%;
        height: 100%;
        direction: ltr;
    }
}
</style>