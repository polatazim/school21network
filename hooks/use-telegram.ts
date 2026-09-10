"use client"

import { useEffect, useState } from "react"

type TelegramUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

type TelegramWebApp = {
  ready: () => void
  expand: () => void
  initDataUnsafe?: {
    user?: TelegramUser
  }
  showAlert?: (message: string) => void
  HapticFeedback?: {
    notificationOccurred: (type: "success" | "error" | "warning") => void
    impactOccurred: (
      style: "light" | "medium" | "heavy" | "rigid" | "soft"
    ) => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null
  return window.Telegram?.WebApp ?? null
}

export function useTelegram() {
  const [webApp] = useState<TelegramWebApp | null>(getTelegramWebApp)
  const user = webApp?.initDataUnsafe?.user ?? null

  useEffect(() => {
    webApp?.ready()
    webApp?.expand()
  }, [webApp])

  return {
    webApp,
    user,
    isTelegram: Boolean(webApp),
    notify: (type: "success" | "error" | "warning" = "success") =>
      webApp?.HapticFeedback?.notificationOccurred(type),
  }
}
