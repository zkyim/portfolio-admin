"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function ModeDarkToggle() {
  const { setTheme } = useTheme()
  const { t } = useTranslation();

  return (
    <Tabs>
        <TabsList className='w-full rounded-full'>
            <TabsTrigger className={cn('w-1/2 rounded-full rounded-r-none dark:bg-transparent bg-background dark:text-muted-foreground text-black')} value="Light" onClick={() => setTheme('light')}>{t("Light")}</TabsTrigger>
            <TabsTrigger className={cn('w-1/2 rounded-full rounded-l-none bg-transparent dark:bg-background text-muted-foreground dark:text-white')} value="Dark" onClick={() => setTheme('dark')}>{t("Dark")}</TabsTrigger>
        </TabsList>
    </Tabs>  
  )
}
