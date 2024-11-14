import chalk from 'chalk';
import { globSync } from 'glob';
import { loadConfig } from 'c12';
import { existsSync, readFileSync } from 'node:fs';

import { projectDir } from '@erudit/const';
import { debug, logger, stress } from '@erudit/logger';
import { DB } from '@erudit/db';
import { Contributor } from '@erudit/db/entities/Contributor';

export default async function buildContributors()
{
    debug.start('Building contributors...');

    const contributorIds = globSync('*/', { cwd: contributorsPath() });

    for (const contributorId of contributorIds)
        await addContributor(contributorId);

    logger.success('Contributors built successfully!', chalk.dim(`(${contributorIds.length})`));
}

async function addContributor(contributorId: string)
{
    debug.info(`Adding contributor ${stress(contributorId)}...`);

    const avatarFile = globSync(`avatar.*`, { cwd: contributorsPath(`/${contributorId}`) }).pop();

    const { config } = await loadConfig({ configFile: contributorsPath(`/${contributorId}/contributor`) });

    const descriptionPath = contributorsPath(`/${contributorId}/description.bi`);
    const description = existsSync(descriptionPath) ? readFileSync(descriptionPath, 'utf-8') : undefined;

    const dbContributor = new Contributor;
    dbContributor.contributorId = contributorId;
    dbContributor.description = description;
    dbContributor.displayName = config?.displayName;
    dbContributor.avatar = avatarFile ? `contributor/${contributorId}/${avatarFile}` : undefined;

    await DB.manager.save(dbContributor);
}

function contributorsPath(relativePath: string = ''): string
{
    return projectDir('/contributors' + relativePath);
}