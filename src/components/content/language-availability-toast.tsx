'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getDictionary } from '@/lib/dictionaries';

interface LanguageAvailabilityToastProps {
  isAvailableInLang: boolean;
  lang: string;
}

export default function LanguageAvailabilityToast({ isAvailableInLang, lang }: LanguageAvailabilityToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (!isAvailableInLang) {
      const showToast = async () => {
        const dict = await getDictionary(lang);
        toast({
          title: dict.notifications.unavailable_translation.title,
          description: dict.notifications.unavailable_translation.description,
        });
      };
      showToast();
    }
  }, [isAvailableInLang, lang, toast]);

  return null;
}
