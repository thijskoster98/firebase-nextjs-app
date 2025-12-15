import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ContactForm from '@/components/forms/contact-form';

export const metadata = {
  title: 'CV & Contact | JSON Portfolio',
  description: 'Download my CV or get in touch using the contact form.',
};

export default function CVContactPage() {
  const cvPath = '/cv/cv.pdf'; // Assuming cv.pdf is in public/cv/

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h1 className="text-4xl font-bold mb-4">CV & Contact</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Here you can view my CV directly or download a PDF copy. For inquiries, please use the contact form.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Curriculum Vitae</CardTitle>
              <CardDescription>
                An overview of my professional experience and skills.
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
                  Download PDF
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 md:mt-[6.5rem]">Get in Touch</h2>
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>
                I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
