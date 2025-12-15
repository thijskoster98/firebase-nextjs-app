import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const metadata = {
  title: 'About Me | JSON Portfolio',
  description: 'A little bit about the author of this site.',
};

export default function AboutPage() {
  const image = PlaceHolderImages.find((img) => img.id === 'author-portrait');

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
          <p className="text-muted-foreground mb-4">Full Stack Developer</p>
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
            About Me
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Hello! I'm a passionate developer with a love for clean code, elegant design, and building things for the web. My journey into technology started with a fascination for how software can solve real-world problems.
            </p>
            <p>
              This website is a personal project where I explore different technologies and share my thoughts on design, development, and everything in between. It's built on a foundation of simplicity, using Next.js and Tailwind CSS, with all content managed through simple JSON files in a Git repository. This 'content-as-data' approach reflects my belief in transparent, developer-friendly systems.
            </p>
            <p>
              When I'm not coding, you can find me exploring new coffee shops, reading science fiction novels, or tinkering with my latest side project. I'm always eager to learn and connect with others who share my interests.
            </p>
            <p>
              Feel free to <Link href="/cv-contact">get in touch</Link> or connect with me on social media.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
