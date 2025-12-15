import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
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
    <>
      <Header lang={lang} dict={dict} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
