import { FormEvent, useEffect, useState } from "react";
import { Command } from "cmdk";

import API from "./utils/internals";

type DisplayMapper<T> = (item: DisplayFor<T>, select: (id: string) => void) => JSX.Element

// todo export mappings to proper components
const displayMappings: Record<string, DisplayMapper<unknown>> = {
    COMMAND: (item: DisplayFor<CommandItem>, select) => {
        return (
            <Command.Item
                className="aria-selected:font-medium data-[disabled]:opacity-50"
                onSelect={() => select(item.id)}
                key={item.name}>
                {item.name}
            </Command.Item>
        )
    },
    ERROR: (item: DisplayFor<ErrorItem>) => {
        return (
            <div className="flex items-center justify-center text-center p-6" key={item.__type}>
                <div>{item.message}</div>
                <div>{item.message}</div>
            </div>
        )
    }
}

export default function Application() {
    const [loading, setLoading] = useState(false)
    const [viewItems, setViewItems] = useState<DisplayFor<unknown>[]>([])

    useEffect(() => {
        async function showFirstCommandList() {
            const displayViewItems = await API.searchInCommands('')

            setViewItems(displayViewItems)
        }

        showFirstCommandList()
    }, [])

    async function select(commandId: string) {
        setLoading(true)

        try {
            const displayItems = await API.executeCommand(commandId)

            if (displayItems.length > 0) {
                setViewItems(displayItems)
            }
        } catch (error) {
            console.log({ error }, JSON.stringify({ error }))
            if (error instanceof Error) {
                setViewItems([{ __type: 'ERROR', message: error.message } as ErrorItem])
            } else {
                setViewItems([{ __type: 'ERROR', message: "Unknown error" } as ErrorItem])
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleInputChange(event: FormEvent) {
        try {
            const inputElement = event.target as HTMLInputElement
            const displayViewItems = await API.searchInCommands(inputElement.value)

            setViewItems(displayViewItems)
        } catch (error) {
            if (error instanceof Error) {
                setViewItems([{ __type: "ERROR", message: error.message } as ErrorItem])
            } else {
                setViewItems([{ __type: "ERROR", message: "Unknown error" } as ErrorItem])
            }
        }
    }

    return (
        <Command className="w-full" onChange={handleInputChange} shouldFilter={false} loop={true}>
            <Command.Input className="w-full" autoFocus />
            <Command.Group className="w-full">
                <Command.List>
                    {loading && <Command.Loading>Loading...</Command.Loading>}
                    {!loading && viewItems.map(item => displayMappings[item.__type](item, select))}
                </Command.List>
            </Command.Group>
        </Command >
    )
}