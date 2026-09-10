"use client"

import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 pt-[calc(env(safe-area-inset-top)+16px)] pb-4">
        <h1 className="text-balance font-heading text-2xl font-extrabold tracking-tight">
          <span className="text-gradient-accent">School 21 Network</span>
        </h1>
        <div className="relative">
          <SearchIcon
            data-icon="inline-start"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Ko'nikma, ism yoki loyiha bo'yicha qidirish..."
            className="rounded-2xl bg-card pl-9 pr-9"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onQueryChange("")}
              className="absolute top-1/2 right-1.5 -translate-y-1/2"
            >
              <XIcon />
              <span className="sr-only">Qidiruvni tozalash</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
