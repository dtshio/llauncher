import { Orama, create, getByID, insert, insertMultiple, search } from '@orama/orama'

import { ManifestCommand } from '../manifest'
import { launcherCommands } from './defaults'

const schema = {
    id: 'string',
    name: 'string',
    description: 'string',
    icon: 'string'
} as const

type Database = Orama<typeof schema>

/**
 * Initializes the command database.
 */
async function initialize() {
    const database = await create({ schema })
    const launcherCommandAsArray = []

    for (const index in launcherCommands) {
        launcherCommandAsArray.push(launcherCommands[index])
    }

    await insertMultiple(database, launcherCommandAsArray)

    return database
}

/**
 * Adds a command into the command registry.
 * It also indexes 
 */
async function addCommand(database: Database, command: ManifestCommand) {
    return insert(database, command)
}

/**
 * Gets a command by the unique ID.
 */
async function getCommandById(database: Database, id: string) {
    return getByID(database, id)
}

/**
 * Performs a search based on a term into command registry.
 */
async function searchCommand(database: Database, term: string) {
    return search(database, {
        term,
        properties: ['name', 'description'], // todo search behaviour for [id] is kinda weird
        sortBy: { property: 'name' }
    })
}

export default { initialize, addCommand, getCommandById, searchCommand }