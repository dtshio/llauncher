/**
 * Builds a single command view.
 */
export function DisplayCommand(options: Omit<CommandItem, '__type'>): CommandItem {
    return { __type: "COMMAND", ...options }
}

/**
 * Builds a error view.
 */
export function DisplayError(options: Omit<ErrorItem, '__type'>): ErrorItem {
    return { __type: "ERROR", ...options }
}

export default {
    command: DisplayCommand,
    error: DisplayError
}