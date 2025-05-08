import React from "react"

interface EntityListProps{
    children: React.ReactNode
}

export default function EntityList({ children }: EntityListProps) {
    return (
        <div className="flex flex-col gap-4 w-200 h-auto mt-20 items-center justify-between text-gray-800 p-4 rounded-lg shadow-md">
            {children}
        </div>
    )
}