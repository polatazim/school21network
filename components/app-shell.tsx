"use client"

import { useMemo, useState } from "react"

import { AddProfileSheet } from "@/components/add-profile-sheet"
import { FilterBadge } from "@/components/filter-badge"
import { FloatingActionButton } from "@/components/floating-action-button"
import { Header } from "@/components/header"
import { ProfileGrid } from "@/components/profile-grid"
import { ProfilesEmptyState } from "@/components/profiles-empty-state"
import { ProfilesSkeleton } from "@/components/profiles-skeleton"
import { useProfiles } from "@/hooks/use-profiles"
import { useTelegram } from "@/hooks/use-telegram"

export function AppShell() {
  useTelegram()

  const { profiles, isLoading, addProfile } = useProfiles()
  const [query, setQuery] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return profiles

    return profiles.filter((profile) => {
      const haystack = [
        profile.name,
        profile.project ?? "",
        ...profile.skills,
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(normalized)
    })
  }, [profiles, query])

  return (
    <div className="min-h-svh">
      <Header query={query} onQueryChange={setQuery} />

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-4">
        {query && !isLoading && (
          <FilterBadge
            query={query}
            count={filtered.length}
            onClear={() => setQuery("")}
          />
        )}

        {isLoading ? (
          <ProfilesSkeleton />
        ) : filtered.length === 0 ? (
          <ProfilesEmptyState hasQuery={Boolean(query)} />
        ) : (
          <ProfileGrid profiles={filtered} />
        )}
      </main>

      <FloatingActionButton onClick={() => setIsSheetOpen(true)} />

      <AddProfileSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSubmit={addProfile}
      />
    </div>
  )
}
