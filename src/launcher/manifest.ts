/**
 * Represents an addon command.
 */
export interface ManifestCommand {
    /**
     * The ID used to identify executed command.
     */
    id: string

    /**
     * The path to the command's svg icon.
     */
    icon?: string

    /**
     * The name of the command.
     */
    name: string

    /**
     * The description of the command.
     */
    description?: string
}

/**
 * The structure for manifest files.
 */
export interface Manifest {
    /**
     * The ID of the addon.
     */
    id: string

    /**
     * The name of the addon.
     */
    name: string

    /**
     * The list of commands registered by this addon.
     */
    commands: ManifestCommand[]
}