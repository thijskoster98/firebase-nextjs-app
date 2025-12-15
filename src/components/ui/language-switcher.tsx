'use client';

import { usePathname, useRouter } from 'next/navigation';
import { GBFlag, NLFlag } from '@/components/ui/flags';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.substring(1, 3);
  const isEnglish = currentLocale === 'en';

  const handleLanguageChange = () => {
    const newLocale = isEnglish ? 'nl' : 'en';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
        <GBFlag className={cn("w-6 transition-opacity", !isEnglish && "opacity-50 hover:opacity-100 cursor-pointer")} onClick={!isEnglish ? handleLanguageChange : undefined} />
        <div 
            onClick={handleLanguageChange}
            className={cn(
                "relative w-10 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors bg-muted",
                isEnglish ? "justify-start" : "justify-end"
            )}
        >
            <div className="w-4 h-4 bg-background rounded-full shadow-md transform transition-transform" />
        </div>
        <NLFlag className={cn("w-6 transition-opacity", isEnglish && "opacity-50 hover:opacity-100 cursor-pointer")} onClick={isEnglish ? handleLanguageChange : undefined} />
    </div>
  );
}
