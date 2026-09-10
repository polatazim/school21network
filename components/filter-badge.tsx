"use client"

import { XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function FilterBadge({
  query,
  count,
  onClear,
}: {
  query: string
  count: number
  onClear: () => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center gap-2 px-4">
      <Badge variant="secondary" className="h-7 gap-1.5 rounded-full px-3 text-xs">
        <span>
          &quot;{query}&quot; uchun {count} natija
        </span>
        <button
          type="button"
          onClick={onClear}
          className="ml-0.5 rounded-full text-muted-foreground hover:text-foreground"
        >
          <XIcon className="size-3" />
          <span className="sr-only">Filtrni tozalash</span>
        </button>
      </Badge>
    </div>
  )
}
