"use client"

import { AnimatePresence } from "framer-motion"

import { ProfileCard } from "@/components/profile-card"
import type { Profile } from "@/types/profile"

export function ProfileGrid({ profiles }: { profiles: Profile[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </AnimatePresence>
    </div>
  )
}
