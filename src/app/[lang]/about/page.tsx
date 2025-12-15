import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang);
    return {
      title: `${dict.about_page.title} | JSON Portfolio`,
      description: 'A little bit about the author of this site.',
    }
}

export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const image = PlaceHolderImages.find((img) => img.id === 'author-portrait');
  const dict = await getDictionary(lang);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="md:col-span-1">
          {image && (
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg mb-6">
              <Image
                src={image.imageUrl}
                alt="Author Portrait"
                fill
                className="object-cover"
                priority
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-muted-foreground mb-4">{dict.about_page.role}</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Github Profile">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn Profile">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Twitter Profile">
                    <Twitter className="h-5 w-5" />
                </Link>
            </Button>
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {dict.about_page.title}
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              {dict.about_page.intro_p1}
            </p>
            <p>
              {dict.about_page.intro_p2}
            </p>
            <p>
              {dict.about_page.intro_p3}
            </p>
            <p dangerouslySetInnerHTML={{ __html: dict.about_page.get_in_touch.replace('{locale}', lang) }} />
          </div>
        </div>
      </div>
    </div>
  );
}
