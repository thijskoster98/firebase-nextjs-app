'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Code2 } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { CATEGORIES, CATEGORY_DISPLAY_NAMES } from '@/lib/types';

const navItems = [
  { href: '/', label: 'Home' },
  ...CATEGORIES.map(cat => ({ href: `/${cat}`, label: CATEGORY_DISPLAY_NAMES[cat] })),
  { href: '/about', label: 'About' },
  { href: '/cv-contact', label: 'CV & Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              JSON Portfolio
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                    ? 'text-foreground font-semibold'
                    : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0">
                    <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                        <Code2 className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block font-headline">
                            JSON Portfolio
                        </span>
                    </Link>
                    <div className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-lg",
                                (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                                 ? 'text-foreground font-semibold'
                                 : 'text-foreground/60'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
