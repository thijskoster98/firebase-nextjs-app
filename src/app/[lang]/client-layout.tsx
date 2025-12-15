'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientLayout({
  children,
  lang,
  dict,
}: {
  children: React.ReactNode;
  lang: string;
  dict: any;
}) {
  const pathname = usePathname();
  // By using a client component, we can avoid hydration errors
  // with components that rely on client-side state like the header/theme toggle.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <Header lang={lang} dict={dict} />
          <main className="flex-grow">{children}</main>
          <Footer lang={lang} dict={dict} />
        </>
      ) : (
        // Render a basic layout on the server to avoid flash of unstyled content
        // You could also use a skeleton loader here.
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b h-14"></header>
          <main className="flex-grow">{children}</main>
          <footer className="border-t">
            <div className="container h-24"></div>
          </footer>
        </div>
      )}
    </>
  );
}
