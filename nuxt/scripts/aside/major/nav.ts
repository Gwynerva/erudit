import type { ShallowRef } from 'vue';

export type MajorNavState = Record<string, ShallowRef<null | 'active' | 'activePart'>>;