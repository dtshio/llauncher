import { BrowserWindow } from "electron"

export default function toggle(window: BrowserWindow) {
    return () => {
        const visible = window.isVisible()

        if (visible) {
            window.hide()
        } else {
            window.show()
        }
    }
}