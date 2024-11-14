export interface Contributor
{
    displayName: string;
}

export function defineContributor(rawContributor: Contributor): Contributor
{
    return rawContributor;
}