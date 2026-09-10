"use client"

import { motion } from "framer-motion"
import { RocketIcon, SendIcon, UserSearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Profile } from "@/types/profile"

export function ProfileCard({ profile }: { profile: Profile }) {
  const telegramHandle = profile.telegram?.replace("@", "")

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-balance font-heading text-lg font-bold text-card-foreground">
          {profile.name}
        </h2>
        {telegramHandle && (
          <a
            href={`https://t.me/${telegramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-accent px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            <SendIcon className="size-3.5" />
            Bog&apos;lanish
          </a>
        )}
      </div>

      {profile.bio && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {profile.bio}
        </p>
      )}

      {profile.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full border-primary/30 bg-primary/10 text-primary"
            >
              {skill}
            </Badge>
          ))}
        </div>
      )}

      {profile.project && (
        <div className="flex items-start gap-2.5 rounded-xl border-l-2 border-accent bg-background/60 px-3 py-2.5">
          <RocketIcon className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
          <p className="text-sm font-medium text-foreground">
            {profile.project}
          </p>
        </div>
      )}

      {profile.looking_for && (
        <div className="text-highlight flex items-center gap-2 text-sm font-medium">
          <UserSearchIcon className="size-4 shrink-0" />
          <span>Qidiradi: {profile.looking_for}</span>
        </div>
      )}
    </motion.article>
  )
}
