import React from "react"

interface EntityListProps{
    children: React.ReactNode
}

export default function EntityList({ children }: EntityListProps) {
    return (
        <div className="flex flex-col gap-4 w-full h-full items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-md">
            {children}
        </div>
    )
}