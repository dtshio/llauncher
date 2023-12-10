import { ManifestCommand } from "../manifest";

import ui from "../ui";

/**
 * A launcher command is a command that includes a handle function.
 * That prevents from spawning a new worker thread for launcher commands.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LauncherCommand = ManifestCommand & { handle: () => Promise<DisplayFor<any>[]> }

/**
 * The list of default commands registered in the launcher.
 */
export const launcherCommands: Record<string, LauncherCommand> = {
    'launcher.version': {
        id: 'launcher.version',
        name: 'Version',
        handle: async () => [ui.command({ id: 'home', name: 'unknown' })]
    }
}
