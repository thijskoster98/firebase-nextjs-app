'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GBFlag, NLFlag } from '@/components/ui/flags';

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
    <Button variant="ghost" size="icon" onClick={handleLanguageChange} aria-label="Change language">
        {isEnglish ? <NLFlag className="h-6 w-6" /> : <GBFlag className="h-6 w-6" />}
    </Button>
  );
}
