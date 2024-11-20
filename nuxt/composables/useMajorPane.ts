import type { Component } from 'vue';
import type { MasterPhraseKey } from '@/languages/en';

import Index from '@/components/aside/major/panes/index/Index.vue';
import Pages from '@/components/aside/major/panes/Pages.vue';
import Search from '@/components/aside/major/panes/Search.vue';
import Language from '@/components/aside/major/panes/Language.vue';
import Other from '@/components/aside/major/panes/other/Other.vue';

interface MajorPane
{
    icon:       string;
    phrase:     MasterPhraseKey;
    content:    Component;
}

function definePane<TPane extends MajorPane>(pane: TPane)
{
    return pane;
}

const panes = {
    index:      definePane({ icon: 'book',          phrase: 'index',    content: Index }),
    pages:      definePane({ icon: 'file',          phrase: 'pages',    content: Pages }),
    search:     definePane({ icon: 'search',        phrase: 'search',   content: Search }),
    language:   definePane({ icon: 'globe',         phrase: 'language', content: Language }),
    other:      definePane({ icon: 'more-vert',     phrase: 'other',    content: Other }),
};

function getPaneOrder(paneKey: MajorPaneKey)
{
    return Object.keys(panes).indexOf(paneKey);
}

export type MajorPaneKey = keyof typeof panes;

export default function()
{
    const route = useRoute();

    const activePane = useState<MajorPaneKey>('major-pane', () => {
        switch (route.path)
        {
            case '/members': return 'pages';
            default: return 'index';
        }
    });

    return {
        panes,
        activePane,
        getPaneOrder,
    }
}