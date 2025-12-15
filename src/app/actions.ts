'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  honeypot: z.string().optional(),
});

type State = {
  success: boolean;
  message: string;
}

export async function submitContactForm(prevState: State | null, formData: FormData): Promise<State> {
  const formValues = Object.fromEntries(formData.entries());

  // Basic honeypot spam protection
  if (formValues.honeypot) {
    // Silently succeed to not alert bots
    console.log('Honeypot field filled, likely spam.');
    return { success: true, message: 'Message sent successfully.' };
  }

  const parsed = contactSchema.safeParse(formValues);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(' ');
    return { success: false, message: `Invalid form data: ${errorMessages}` };
  }

  try {
    // In a real application, you would send an email here using a service like Resend, SendGrid, or Nodemailer.
    console.log('New contact form submission:');
    console.log('Name:', parsed.data.name);
    console.log('Email:', parsed.data.email);
    console.log('Message:', parsed.data.message);
    
    return { success: true, message: 'Message sent successfully.' };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  }
}
