import type { Metadata } from 'next';
import ClientLayout from './client-layout';
import { getDictionary } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'JSON Portfolio',
  description: 'A minimal, fast personal portfolio & publishing website driven by JSON files.',
};

export default async function LangLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dict = await getDictionary(lang);
  return (
    <ClientLayout lang={lang} dict={dict}>
      {children}
    </ClientLayout>
  );
}
