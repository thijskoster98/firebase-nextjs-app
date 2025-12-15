'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LanguageAvailabilityToastProps {
  isAvailableInLang: boolean;
  lang: string;
  dictUnavailableTranslation: {
    title: string;
    description: string;
  }
}

export default function LanguageAvailabilityToast({ isAvailableInLang, lang, dictUnavailableTranslation }: LanguageAvailabilityToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (!isAvailableInLang) {
      toast({
        title: dictUnavailableTranslation.title,
        description: dictUnavailableTranslation.description,
      });
    }
  }, [isAvailableInLang, lang, toast, dictUnavailableTranslation]);

  return null;
}