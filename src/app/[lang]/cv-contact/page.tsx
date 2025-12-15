import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ContactForm from '@/components/forms/contact-form';
import { getDictionary } from '@/lib/dictionaries';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang);
    return {
      title: `${dict.cv_contact_page.title} | JSON Portfolio`,
      description: 'Download my CV or get in touch using the contact form.',
    }
}

export default async function CVContactPage({ params: { lang } }: { params: { lang: string } }) {
  const cvPath = '/cv/cv.pdf'; // Assuming cv.pdf is in public/cv/
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h1 className="text-4xl font-bold mb-4">{dict.cv_contact_page.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {dict.cv_contact_page.intro}
          </p>

          <Card>
            <CardHeader>
              <CardTitle>{dict.cv_contact_page.cv_title}</CardTitle>
              <CardDescription>
                {dict.cv_contact_page.cv_description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] w-full bg-muted rounded-md mb-4">
                <iframe
                  src={cvPath}
                  className="w-full h-full border rounded-md"
                  title="CV"
                />
              </div>
              <Button asChild className="w-full">
                <a href={cvPath} download="cv.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  {dict.cv_contact_page.download_pdf}
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 md:mt-[6.5rem]">{dict.cv_contact_page.get_in_touch}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{dict.cv_contact_page.contact_me_title}</CardTitle>
              <CardDescription>
                {dict.cv_contact_page.contact_me_description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm dict={dict.cv_contact_page} />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
