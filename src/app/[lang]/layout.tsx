import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Portfolio',
  description: 'A minimal, fast personal portfolio & publishing website driven by JSON files.',
};

export default function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
