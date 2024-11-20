import NavBook from '@/components/aside/major/panes/index/NavBook.vue';
import NavGlobal from '@/components/aside/major/panes/index/NavGlobal.vue';
import NavLoading from '@/components/aside/major/panes/index/NavLoading.vue';

const panes = {
    global:     NavGlobal,
    loading:    NavLoading,
    book:       NavBook,
};

function getPaneOrder(paneKey: NavPaneType): number
{
    return Object.keys(panes).indexOf(paneKey);
}

export type NavPaneType = keyof typeof panes;

export default function()
{
    const activePane = useState<NavPaneType>('nav-pane', () => 'global');

    return {
        panes,
        activePane,
        getPaneOrder,
    }
}