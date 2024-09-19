"use client";
import React, { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'

import i18n from "@/app/(languages)/index"
import { useLanguage } from '@/store/use-language';
import { useTranslation } from 'react-i18next';

const ToggleLanguage = () => {
  const { isEnglish, onSelect, unSelect } = useLanguage();
  const { t } = useTranslation();
  
  const handleLanguageEnglish = () => {
    i18n.changeLanguage("en");
    onSelect();
  }
  const handleLanguageArabic = () => {
    i18n.changeLanguage("ar");
    unSelect();
  }
  
  return (
    <Tabs>
        <TabsList  className='w-full rounded-full'>
        <TabsTrigger className={cn('w-1/2 rounded-full rounded-r-none ', isEnglish && "bg-background")} value="password" onClick={handleLanguageEnglish}>{t("English")}</TabsTrigger>
        <TabsTrigger className={cn('w-1/2 rounded-full rounded-l-none ', !isEnglish && "bg-background")} value="account" onClick={handleLanguageArabic}>{t("Arabic")}</TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ToggleLanguage
