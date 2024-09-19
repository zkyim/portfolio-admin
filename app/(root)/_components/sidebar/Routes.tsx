"use client";
import React from 'react'
import { usePathname } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Route from './Route';
import { cn } from '@/lib/utils';

import { routes } from "../constant/routes"
import { useLanguage } from '@/store/use-language';

export const Routes = () => {
  const pathname = usePathname();
  const { isEnglish } = useLanguage();
  return (
    <div className='w-full h-full py-2'>
        {routes.map((route, i) => {
          if (route.childred.routes.length === 0) {
            return (
              <Route key={route.href} href={route.href} label={route.label} icon={route.icon} isActive={pathname === route.href} />
            )
          }else {
            return(
              <Accordion key={route.href} type="single" collapsible>
              <AccordionItem value={route.href}>
                  <AccordionTrigger className={cn('p-0', isEnglish ? "pr-5" : "pl-5", pathname === route.href || pathname.indexOf(route.href) !== -1 && "bg-primary/5")}>
                    <Route href={route.href} label={route.label} isParint icon={route.icon} isActive={pathname === route.href || pathname.indexOf(route.href) !== -1} />
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col w-full'>
                      {route.childred.routes.map(child => (
                        <Route key={child.href} href={child.href} isChild label={child.label} icon={child.icon} isActive={pathname === child.href} isEnglish={isEnglish}/>
                      ))}
                  </AccordionContent>
              </AccordionItem>
              </Accordion>
            )
          }
        })}
    </div>
  )
}
