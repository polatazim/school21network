"use client"

import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { useTelegram } from "@/hooks/use-telegram"
import type { NewProfile } from "@/types/profile"

const MAX_NAME = 100
const MAX_BIO = 500
const MAX_PROJECT = 200
const MAX_LOOKING_FOR = 200

type FormState = {
  name: string
  bio: string
  skills: string
  project: string
  lookingFor: string
}

const initialState: FormState = {
  name: "",
  bio: "",
  skills: "",
  project: "",
  lookingFor: "",
}

export function AddProfileSheet({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (profile: NewProfile) => Promise<unknown>
}) {
  const { user, notify } = useTelegram()
  const [form, setForm] = useState<FormState>(initialState)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function reset() {
    setForm(initialState)
    setError(null)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const name = form.name.trim()
    if (!name) {
      setError("Ism kiritish shart.")
      return
    }
    if (name.length > MAX_NAME) {
      setError(`Ism ${MAX_NAME} belgidan oshmasligi kerak.`)
      return
    }

    setError(null)
    setIsSubmitting(true)

    const telegramUsername = user?.username ? `@${user.username}` : null
    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .slice(0, 20)

    try {
      await onSubmit({
        name,
        bio: form.bio.trim().slice(0, MAX_BIO),
        skills,
        telegram: telegramUsername,
        project: form.project.trim().slice(0, MAX_PROJECT),
        looking_for: form.lookingFor.trim().slice(0, MAX_LOOKING_FOR),
      })
      notify("success")
      toast.success("Profil saqlandi!")
      reset()
      onOpenChange(false)
    } catch {
      notify("error")
      toast.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) reset()
      }}
    >
      <SheetContent side="bottom" className="max-h-[90vh] rounded-t-3xl">
        <SheetHeader>
          <SheetTitle>Profil yaratish</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 overflow-y-auto px-4 pb-4"
        >
          <FieldGroup>
            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="name">Ism Familiya</FieldLabel>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Azizbek Karimov"
                aria-invalid={Boolean(error)}
                maxLength={MAX_NAME}
                required
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">O&apos;zingiz haqingizda</FieldLabel>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(event) => update("bio", event.target.value)}
                placeholder="Qisqacha o'zingiz haqingizda..."
                rows={2}
                maxLength={MAX_BIO}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="skills">
                Ko&apos;nikmalar
              </FieldLabel>
              <Input
                id="skills"
                value={form.skills}
                onChange={(event) => update("skills", event.target.value)}
                placeholder="Python, React, SQL"
              />
              <FieldDescription>Vergul bilan ajratib yozing.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="project">Loyihangiz</FieldLabel>
              <Input
                id="project"
                value={form.project}
                onChange={(event) => update("project", event.target.value)}
                placeholder="To'lov tizimi"
                maxLength={MAX_PROJECT}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="looking-for">
                Kimni qidiryapsiz?
              </FieldLabel>
              <Input
                id="looking-for"
                value={form.lookingFor}
                onChange={(event) => update("lookingFor", event.target.value)}
                placeholder="Frontend hamkor"
                maxLength={MAX_LOOKING_FOR}
              />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-accent mt-2 h-12 rounded-2xl text-base font-bold text-primary-foreground"
          >
            {isSubmitting && <Loader2Icon className="animate-spin" data-icon="inline-start" />}
            Saqlash
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
