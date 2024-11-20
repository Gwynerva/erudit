export type ContentType = 'book' | 'group' | 'topic';

export interface ContentFlags
{
    /** Content is developing and might be changed in future. */
    dev?: boolean;

    /** Content that can be considered "complex" for students and requires good knowledge. */
    advanced?: boolean;

    /** Additional enlightening content that students are not required to learn. */
    secondary?: boolean;
}

export type ContentFlag = keyof ContentFlags;

export interface Content
{
    /** Title which will be showing in main area of the site. */
    title: string;

    /** Title which will be showing in navigation tree. */
    navTitle: string;

    /** Show this item and its children in production. */
    hidden: boolean;

    /** Additional flags. */
    flags: ContentFlags;
}