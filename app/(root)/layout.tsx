"use client";
import React from "react"
import { Sidebar } from "./_components/sidebar/Sidebar";
import Navbar from "./_components/navbar/Navbar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/store/use-language";
import { useEffect, useState } from "react";
import i18n from "../(languages)/index"
import Cookies from 'js-cookie'

const LayoutRoot = ({
    children,
}: {
    children: React.ReactNode,
}) => {
    const { isEnglish } = useLanguage();
    const [isClient, setIsClient] = useState(false);
    const { unSelect, onSelect } = useLanguage();
    
    const lng = Cookies.get("i18next") || "en";
    
    useEffect(() => {
        window.document.dir = i18n.dir();
        if (lng == "en") {
            onSelect();
            window.document.body.classList.add("dirLTR");
        }else if (lng == "ar") {
            window.document.body.classList.add("dirRTL");
          unSelect();
        }
    }, [lng, onSelect, unSelect])

    useEffect(() => {
      setIsClient(true)
    }, []);

    if (!isClient) return null;

    return (
        <div className="w-full h-full">
            <div className="w-full h-full">
                <div className={cn("hidden lg:block border-muted-foreground/20 border-r w-[260px] fixed top-0 h-full", isEnglish ? "left-0" : "right-0")}>
                    <Sidebar />
                </div>
                <div className={cn("min-h-[calc(100vh - 70px)]", isEnglish ? "lg:pl-[260px]" : "lg:pr-[260px]")}>
                    <Navbar />
                    <div className="p-6 h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutRoot;