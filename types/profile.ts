export type Profile = {
  id: string
  name: string
  bio: string | null
  skills: string[]
  telegram: string | null
  project: string | null
  looking_for: string | null
  created_at: string
}

export type NewProfile = {
  name: string
  bio: string
  skills: string[]
  telegram: string | null
  project: string
  looking_for: string
}
