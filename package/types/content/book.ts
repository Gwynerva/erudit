import { Content } from '.';

export interface ContentBook extends Partial<Content>
{

}

export function defineBook(book: Partial<ContentBook>)
{
    return book;
}