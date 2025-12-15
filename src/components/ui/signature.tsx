'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Signature = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Function to check and set the theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    // Initial check
    checkTheme();

    // Use a MutationObserver to watch for class changes on the <html> element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  const signatureSrc = theme === 'dark' ? '/signature-light.png' : '/signature-dark.png';

  return (
    <div className={cn('relative', className)}>
      <Image 
        src={signatureSrc} 
        alt="Signature" 
        width={458} 
        height={178} 
        className="h-full w-auto"
        unoptimized // Prevents Next.js from trying to optimize a potentially dynamic source
      />
    </div>
  );
};

export default Signature;
