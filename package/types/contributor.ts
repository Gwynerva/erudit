export interface Contributor
{
    displayName: string;
}

export function defineContributor(contributor: Contributor): Contributor
{
    return contributor;
}