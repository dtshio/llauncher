import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('launcher', {
    search: (input: string) => ipcRenderer.invoke('search', input),
    execute: async (id: string) => ipcRenderer.invoke('execute-command', { id }),

    close: () => ipcRenderer.send('hide-window')
})