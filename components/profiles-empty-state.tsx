import { SparklesIcon, UsersRoundIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function ProfilesEmptyState({ hasQuery }: { hasQuery: boolean }) {
  if (hasQuery) {
    return (
      <Empty className="py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SparklesIcon />
          </EmptyMedia>
          <EmptyTitle>Hech narsa topilmadi</EmptyTitle>
          <EmptyDescription>
            Boshqa ism, ko&apos;nikma yoki loyiha nomi bilan qidirib
            ko&apos;ring.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Empty className="py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersRoundIcon />
        </EmptyMedia>
        <EmptyTitle>Hozircha profillar yo&apos;q</EmptyTitle>
        <EmptyDescription>
          Birinchi bo&apos;lib profilingizni yarating va jamoadosh toping.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent />
    </Empty>
  )
}
