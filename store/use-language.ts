import { create } from "zustand"

interface LanguageProps {
    isEnglish: boolean;
    onSelect: () => void;
    unSelect: () => void;
}

export const useLanguage = create<LanguageProps>(set => ({
    isEnglish: true,
    onSelect: () => set(() => ({ isEnglish: true })),
    unSelect: () => set(() => ({ isEnglish: false })),
}))