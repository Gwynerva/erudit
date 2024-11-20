<script lang="ts" setup>
import type { FNavItem as TFNavItem } from '@/shared/frontNav';
import type { MajorNavState } from '@scripts/aside/major/nav';
import FNavItem from './FNavItem.vue';

const props = defineProps<{ nav: TFNavItem[] }>();
const contentRoute = useContentRoute();

/**
 * Nav state for all navigation items that is injected in any child nav component.
 * Child components watch ONLY their id to determine whether it is active or not.
 * We have a choice to sacrifice speed or memory (`ref` for each navigation element). We choose speed over memory.
 */
const navState: MajorNavState = {};

function initNavState()
{
    const initItemsState = (items: TFNavItem[]) => items.forEach(item => {
        navState[item.id] = shallowRef<null | 'active' | 'activePart'>(null);
        if (item['children']) initItemsState(item['children']);
    });

    initItemsState(props.nav);
}

watch(props, initNavState);
initNavState();

provide('navState', navState);


/**
 * Nav item ids that are currentle in `active` or `activePart` state.
 * Used to unset active state when route changes.
 */
let activeIds: string[] = [];

watch(contentRoute, updateNavState, { immediate: true });

function updateNavState()
{
    const targetId = contentRoute.id;
    let newStack: TFNavItem[] = [];
    let breakScan = !targetId;

    const scanChildren = (items: TFNavItem[]) =>
    {
        if (breakScan) return;

        for (const item of items)
        {
            if (item.id === targetId)
            {
                newStack.push(item);
                breakScan = true;
                return;
            }

            if (item.type === 'book' && !item['hildren'])
            {
                // We are in global nav so we can break right here because books in global nav have no children
                if (targetId.indexOf(item.id) === 0)
                {
                    // `targetId` somewhere in this book but we don't care, we already found the book we are looking for
                    newStack.push(item);
                    breakScan = true;
                    return;
                }
            }

            if (item['children'])
            {
                newStack.push(item);
                scanChildren(item['children']);

                if (breakScan) return;
                else newStack.pop();
            }
        }
    }

    scanChildren(props.nav);

    // Set new state for active items
    let newIds: string[] = [];
    newStack.forEach((item, i) => {
        const isLast = i === newStack.length - 1;
        const id = item.id;

        navState[item.id].value = isLast ? 'active' : 'activePart';
        newIds.push(id);
    });

    // Unset items that are not active anymore
    const toUnsetIds = activeIds.filter(id =>!newIds.includes(id));
    toUnsetIds.forEach(id => navState[id].value = null);

    activeIds = newIds;
}
</script>

<template>
    <TreeContainer>
        <slot name="before"></slot>
        <FNavItem v-for="navItem of nav" :navItem />
    </TreeContainer>
</template>