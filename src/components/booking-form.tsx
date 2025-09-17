'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { sendLead } from '@/ai/flows/send-lead';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';


interface BookingFormProps {
  propertyTitle: string;
  children: React.ReactNode;
}

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type FormValues = z.infer<typeof FormSchema>;

export function BookingForm({ propertyTitle, children }: BookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await sendLead({ ...data, property: propertyTitle });
      
      const message = `${t.bookingMessageIntro} "${propertyTitle}".\n${t.bookingMessageDetails}:\n${t.formLabelName}: ${data.name}\n${t.formLabelEmail}: ${data.email}\n${t.formLabelPhone}: ${data.phone}`;
      const whatsappUrl = `https://wa.me/201099993903?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      
      setIsOpen(false);
      form.reset();

    } catch (error) {
        toast({
            variant: "destructive",
            title: t.toastErrorTitle,
            description: t.toastErrorDescription,
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.bookingFormTitle} {propertyTitle}</DialogTitle>
          <DialogDescription>
            {t.bookingFormDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.formLabelName}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.formPlaceholderName} {...field} />
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
                  <FormLabel>{t.formLabelEmail}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.formPlaceholderEmail} {...field} />
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
                  <FormLabel>{t.formLabelPhone}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.formPlaceholderPhone} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? t.formButtonSubmitting : t.bookingButtonProceed}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
