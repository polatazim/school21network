"use client"

import { motion } from "framer-motion"
import { PlusIcon } from "lucide-react"

export function FloatingActionButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-gradient-accent fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+20px)] z-50 flex size-14 items-center justify-center rounded-full text-primary-foreground shadow-[0_8px_30px_-4px_var(--gradient-to)]"
    >
      <PlusIcon className="size-6" />
      <span className="sr-only">Profil qo&apos;shish</span>
    </motion.button>
  )
}
