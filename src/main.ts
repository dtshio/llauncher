import { app, BrowserWindow, globalShortcut, nativeImage, screen, Tray } from 'electron'

import path from 'path'
import toggle from './utils/toggle'

import launcher from './launcher'

if (require('electron-squirrel-startup')) {
  app.quit()
}

async function createWindow() {
  const display = screen.getPrimaryDisplay()
  const mainWindow = new BrowserWindow({
    // size and position
    width: 500,
    height: 400,

    maxHeight: 400,

    maxWidth: 500,
    minWidth: 500,

    x: display.bounds.width / 2 - 500 / 2,
    y: display.bounds.height / 2 - 400,

    // general
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    transparent: true,
    hasShadow: false,
    show: false,

    fullscreenable: false,

    // darwin,win32
    movable: false,
    closable: true,

    titleBarStyle: 'hidden',

    // darwin
    roundedCorners: true,

    // win32
    backgroundMaterial: "auto", // WIN11?

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  await launcher.setup({ window: mainWindow })

  // menu app
  const tray = new Tray(nativeImage.createEmpty())
  const toggleWindowVisibility = toggle(mainWindow)

  tray.setTitle('launcher')
  tray.addListener('click', toggleWindowVisibility)

  // todo custom global shortcut
  globalShortcut.register('CommandOrControl+Alt+E', toggleWindowVisibility)

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }
}

/**
 * Closes the application when there is no more open windows.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

/**
 * Called when gracefully shutting down.
 */
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('activate', () => {
  const windows = BrowserWindow.getAllWindows()

  if (windows.length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)