import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('launcher', {
    search: async (input: string) => ipcRenderer.invoke('search-command', input),
    execute: async (id: string) => ipcRenderer.invoke('execute-command', { id }),

    close: () => ipcRenderer.send('hide-window')
})