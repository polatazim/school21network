"use client"

import useSWR from "swr"

import { createClient } from "@/lib/supabase/client"
import type { NewProfile, Profile } from "@/types/profile"

async function fetchProfiles(): Promise<Profile[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as Profile[]
}

export function useProfiles() {
  const { data, error, isLoading, mutate } = useSWR<Profile[]>(
    "profiles",
    fetchProfiles
  )

  async function addProfile(profile: NewProfile) {
    const supabase = createClient()
    const { data: inserted, error } = await supabase
      .from("profiles")
      .insert([profile] as never)
      .select()
      .single()

    if (error) throw error

    await mutate((current) =>
      inserted ? [inserted as Profile, ...(current ?? [])] : current
    )

    return inserted as Profile
  }

  return {
    profiles: data ?? [],
    isLoading,
    error,
    addProfile,
  }
}
