'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    const newPath = `/${newLocale}/${pathname.substring(4)}`; // Assumes /en/ or /nl/
    router.push(newPath);
  };

  const currentLocale = pathname.substring(1, 3);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          disabled={currentLocale === 'en'}
        >
          EN
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('nl')}
          disabled={currentLocale === 'nl'}
        >
          NL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
