"use client";
import React from 'react'


import { ModeDarkToggle } from './ToggleModeDark';
import ToggleLanguage from './ToggleLanguage';

export const Actions = () => {
  return (
    <div className='flex flex-col gap-y-3 w-full px-6 py-3'>
      <ToggleLanguage />
      <ModeDarkToggle />
    </div>
  )
}
