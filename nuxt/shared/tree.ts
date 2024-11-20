// export interface TreeItem
// {
//     icon: string;
//     label: string;
//     flags?: TreeFlag[];
//     link?: string;
//     click?: () => void;
// }

// export interface TreeFlag
// {
//     icon: string;
//     title: string;
// }

// export interface TreeSep
// {
//     label: string;
//     link?: string;
//     flags?: TreeFlag[];
// }

// export interface TreeFolder
// {
//     label: string;
//     //children?:
//     link?: string;
// }

// export interface TreeGroup
// {
//     // тип
//     type: 'sep' | 'toggle';
//     label: string;
//     link?: string;
//     children: TreeItem[];
// }

// export interface TreeFlag
// {
//     icon: string;
//     hint?: string;
// }

// export interface TreeItem
// {
//     level: number;
//     label: string;
//     link?: string;
//     flags?: TreeFlag[];
// }

// export interface TreePlain extends TreeItem
// {
//     icon: string;
//     click?: () => void;
// }

// interface TreeGroup extends TreeItem
// {
//     type: 'section' | 'folder';
//     label: string;
//     children?: TreeItem[];
//     link?: string;
//     flags?: TreeFlag[];
// }