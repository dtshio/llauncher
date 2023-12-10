import { BrowserWindow, ipcMain } from "electron";

import { ManifestCommand } from "./manifest";
import { launcherCommands } from "./commands/defaults";

import toggleWindowVisiblity from "../utils/toggle";

import registry from "./commands/registry";
import ui from "./ui";

/**
 * Setups the launcher and event handlers.
 */
async function setup(application: { window: BrowserWindow }) {
    const commands = await registry.initialize()

    /**
     * Displays a list of commands based on search term.
     */
    ipcMain.handle('search-command', async (_, term: string) => {
        const { hits } = await registry.searchCommand(commands, term)

        return hits.map(hit => {
            const command = hit.document as ManifestCommand

            return ui.command({
                id: command.id,
                name: command.name
            })
        })
    })

    /**
     * Changes the frontend view based on an addon command.
     */
    ipcMain.handle('execute-command', async (_, { id }: { id: string }) => {
        try {
            const [addon] = id.split('.', 2)

            if (addon === 'launcher') {
                return await launcherCommands[id].handle()
            }

            // todo handle custom addons

            return []
        } catch (error) {
            return [ui.error({ message: error.message })]
        }
    })

    // Hides the window when requested by frontend
    ipcMain.handle('hide-window', toggleWindowVisiblity(application.window))
}

export default { setup }