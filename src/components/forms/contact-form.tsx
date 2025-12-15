'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { useEffect, useRef } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm({ dict }: { dict: any }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: '',
    },
  });

  const { formState, isSubmitting } = form;

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await submitContactForm(null, formData);

    if (result.success) {
      toast({
        title: dict.form_success_title,
        description: dict.form_success_description,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: dict.form_error_title,
        description: result.message || 'There was a problem with your request.',
      });
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
        form.reset();
    }
  }, [formState.isSubmitSuccessful, form.reset]);


  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form_name_label}</FormLabel>
              <FormControl>
                <Input placeholder={dict.form_name_placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form_email_label}</FormLabel>
              <FormControl>
                <Input placeholder={dict.form_email_placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form_message_label}</FormLabel>
              <FormControl>
                <Textarea placeholder={dict.form_message_placeholder} {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="text" {...field} tabIndex={-1} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? dict.form_sending_button : dict.form_submit_button}
        </Button>
      </form>
    </Form>
  );
}
