import type { ContentBook } from 'erudit';

import type { NavNode } from '@erudit/nav';
import { debug, stress } from '@erudit/logger';
import type { DbContent } from '@/erudit/db/entities/Content';
import { DbBook } from '@/erudit/db/entities/Book';
import { DB } from '@/erudit/db';

export default async function buildBook(navBook: NavNode, content: ContentBook, dbContent: DbContent)
{
    debug.info(`Adding book ${stress(navBook.id)}...`);

    const dbBook = new DbBook;
    dbBook.contentId = navBook.id;

    await DB.manager.save(dbBook);
}