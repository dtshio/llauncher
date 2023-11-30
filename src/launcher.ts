import { BrowserWindow, ipcMain } from "electron";

import toggleVisiblity from "./utils/toggle";

function DisplayCommand(options: Omit<CommandItem, '__type'>): CommandItem {
    return { __type: "COMMAND", ...options }
}

function DisplayError(options: Omit<ErrorItem, '__type'>): ErrorItem {
    return { __type: "ERROR", ...options }
}

function handle({ window }: { window: BrowserWindow }) {
    ipcMain.handle('search', async () => {
        return [
            DisplayCommand({ id: 'addon1', name: "Example Addon" }),
            DisplayCommand({ id: 'error', name: "Error Addon" }),
        ]
    })

    ipcMain.handle('execute-command', async (_, { id }: { id: string }) => {
        try {
            if (id === 'error') {
                await new Promise((resolve) => setTimeout(resolve, 2000))
                throw new Error("!!!")
            }

            if (id === 'addon1') {
                return [DisplayCommand({ id: "addon1", name: '∞ over Addon' })]
            }

            return [DisplayError({ message: 'Command not found' })]
        } catch (error) {
            return [DisplayError({ message: error.message })]
        }
    })

    ipcMain.handle('hide-window', toggleVisiblity(window))
}

export default {
    handle: handle
}