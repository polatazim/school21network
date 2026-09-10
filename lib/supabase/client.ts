import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// This app has no auth and no server: the profiles table is public by
// design (RLS allows anon select/insert only, no update/delete), so a
// single browser-side client using the publishable anon key is sufficient.
let client: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  client = createSupabaseClient(url, anonKey, {
    auth: {
      persistSession: false,
    },
  })

  return client
}
