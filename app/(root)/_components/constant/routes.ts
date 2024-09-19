"use client";
import { Dumbbell, LayoutDashboard, NotepadText, PencilRulerIcon, School } from 'lucide-react';

export const routes = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        childred: {
            routes: []
        }
    },
    {
        label: "Management",
        href: "/management",
        icon: PencilRulerIcon,
        childred: {
            routes: [
                {
                  label: "Education",
                  href: "/management/education",
                  icon: School,
                },
                {
                  label: "Skills",
                  href: "/management/skills",
                  icon: Dumbbell,
                },
                {
                  label: "Projects",
                  href: "/management/projects",
                  icon: NotepadText,
                },

            ]
        }
    },
]