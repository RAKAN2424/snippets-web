'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendLead } from '@/ai/flows/send-lead';

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function LeadForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
        await sendLead({ ...data, property: 'General Inquiry' });

        const message = `Hello, I have a general inquiry.\nMy details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nNotes: ${data.notes}`;
        const whatsappUrl = `https://wa.me/201099993903?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        form.reset();
        
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was a problem with your request. Please try again.",
        });
    }
  };

  return (
    <Card className="bg-card/50 text-left mt-4">
      <CardHeader>
        <CardTitle>Send a General Inquiry</CardTitle>
        <CardDescription>
          Have a question? Fill out the form below and we'll get back to you, or chat with us on WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes / Questions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us how we can help" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending...' : 'Send Inquiry & Chat on WhatsApp'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
