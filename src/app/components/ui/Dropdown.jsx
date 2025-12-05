import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useGenerations } from "@/app/hooks/usePokemonGen"

export function Dropdown({ dropdownValue, setDropdownValue }) {
    const [collapsed, setCollapsed] = useState(false)

    const { generations, error, loading } = useGenerations()

    const handleSelect = (generation) => {
        setDropdownValue(generation.name)
        setCollapsed(false)
    }

    return (
        <div className="inline-block relative">
            <div
                className="flex items-center gap-2 p-2 border border-[#7e7e7e] bg-white rounded-2xl cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
            >
                <p className="capitalize">{dropdownValue}</p>
                {collapsed ? <ChevronUp /> : <ChevronDown />}
            </div>
            {collapsed && (
                <ul
                    className="absolute top-full w-full mt-2 border border-[#7e7e7e] bg-white rounded-2xl p-2 shadow-lg z-10"
                >
                    {loading && <li className="p-2">Loading...</li>}
                    {error && <li className="p-2 text-red-500">Error: {error}</li>}
                    {generations.map((gen) => (
                        <li
                            key={gen.name}
                            className="p-2 hover:bg-gray-100 rounded cursor-pointer capitalize"
                            onClick={() => handleSelect(gen)}
                        >
                            {gen.name.replace('-', ' ')}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}