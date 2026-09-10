import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The app is fully client-rendered (Supabase is called with the anon key
  // directly from the browser, no server routes or actions), so it deploys
  // cleanly on Vercel without needing a Node.js server at runtime.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
