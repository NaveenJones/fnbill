import { useEffect, useState } from "react"

export function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <div className="flex justify-end">
            <input {...props} value={value} onChange={e => setValue(e.target.value)} className="p-2 font-lg outline-none border-b-2 w-60" />
        </div>
    )
}