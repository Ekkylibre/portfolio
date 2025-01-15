'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { Language } from '@/lib/i18n';

interface ContactFormProps {
  language: Language;
  translations: {
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      placeholders: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
    };
  };
}

// Constantes de validation
const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_LENGTH = 10;
const MAX_SUBJECT_LENGTH = 100; // Modifié de 1000 à 100
const MIN_SUBJECT_LENGTH = 3;
const SUBMIT_DELAY = 60000; // 60 secondes entre chaque soumission
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z\s-]{2,50}$/;

export function ContactForm({ language, translations: t }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const { toast } = useToast();

  // Fonction de validation des entrées
  const validateInput = (
    name: string,
    email: string,
    subject: string,
    message: string
  ): { isValid: boolean; error?: string } => {
    // Validation du nom
    if (!NAME_REGEX.test(name)) {
      return {
        isValid: false,
        error: language === 'fr'
          ? 'Le nom doit contenir entre 2 et 50 caractères et ne peut contenir que des lettres, espaces et tirets'
          : 'Name must be between 2 and 50 characters and can only contain letters, spaces and hyphens'
      };
    }

    // Validation de l'email
    if (!EMAIL_REGEX.test(email)) {
      return {
        isValid: false,
        error: language === 'fr'
          ? 'Veuillez entrer une adresse email valide'
          : 'Please enter a valid email address'
      };
    }

    // Validation du sujet
    if (subject.length < MIN_SUBJECT_LENGTH || subject.length > MAX_SUBJECT_LENGTH) {
      return {
        isValid: false,
        error: language === 'fr'
          ? `Le sujet doit contenir entre ${MIN_SUBJECT_LENGTH} et ${MAX_SUBJECT_LENGTH} caractères`
          : `Subject must be between ${MIN_SUBJECT_LENGTH} and ${MAX_SUBJECT_LENGTH} characters`
      };
    }

    // Validation du message
    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return {
        isValid: false,
        error: language === 'fr'
          ? `Le message doit contenir entre ${MIN_MESSAGE_LENGTH} et ${MAX_MESSAGE_LENGTH} caractères`
          : `Message must be between ${MIN_MESSAGE_LENGTH} and ${MAX_MESSAGE_LENGTH} characters`
      };
    }

    return { isValid: true };
  };

  // Fonction de nettoyage des entrées
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Supprime les balises HTML
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification du délai entre les soumissions
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_DELAY) {
      const remainingTime = Math.ceil((SUBMIT_DELAY - (now - lastSubmitTime)) / 1000);
      toast({
        title: language === 'fr' ? "Veuillez patienter" : "Please wait",
        description: language === 'fr'
          ? `Merci d'attendre ${remainingTime} secondes avant de renvoyer un message`
          : `Please wait ${remainingTime} seconds before sending another message`,
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Récupération et nettoyage des données
    const name = sanitizeInput(formData.get('name') as string);
    const email = sanitizeInput(formData.get('email') as string);
    const subject = sanitizeInput(formData.get('subject') as string);
    const message = sanitizeInput(formData.get('message') as string);

    // Validation des données
    const validation = validateInput(name, email, subject, message);
    if (!validation.isValid) {
      toast({
        title: language === 'fr' ? "Erreur de validation" : "Validation Error",
        description: validation.error,
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparation des données pour EmailJS
      const emailData = {
        to_name: 'Dany',
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setLastSubmitTime(now);
      
      toast({
        title: language === 'fr' ? "Message envoyé !" : "Message sent!",
        description: language === 'fr' 
          ? "Merci de m'avoir contacté. Je vous répondrai dès que possible."
          : "Thank you for reaching out. I'll get back to you as soon as possible.",
        duration: 4000,
      });

      form.reset();
    } catch (error) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr'
          ? "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
          : "An error occurred while sending the message. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-muted-foreground">
            {t.form.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={50}
            pattern="[a-zA-Z\s-]{2,50}"
            className="mt-2 p-3 w-full border border-muted rounded-md bg-background"
            placeholder={t.form.placeholders.name}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-muted-foreground">
            {t.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 p-3 w-full border border-muted rounded-md bg-background"
            placeholder={t.form.placeholders.email}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-lg font-medium text-muted-foreground">
          {t.form.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={MAX_SUBJECT_LENGTH}
          className="mt-2 p-3 w-full border border-muted rounded-md bg-background"
          placeholder={t.form.placeholders.subject}
        />
        <div className="text-sm text-muted-foreground mt-1">
          {language === 'fr' 
            ? `Maximum ${MAX_SUBJECT_LENGTH} caractères`
            : `Maximum ${MAX_SUBJECT_LENGTH} characters`}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-lg font-medium text-muted-foreground">
          {t.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={MAX_MESSAGE_LENGTH}
          className="mt-2 p-3 w-full border border-muted rounded-md bg-background"
          placeholder={t.form.placeholders.message}
        />
        <div className="text-sm text-muted-foreground mt-1">
          {language === 'fr' 
            ? `Maximum ${MAX_MESSAGE_LENGTH} caractères`
            : `Maximum ${MAX_MESSAGE_LENGTH} characters`}
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
        <Send className="mr-2 h-5 w-5" />
        {isSubmitting ? (language === 'fr' ? 'Envoi...' : 'Sending...') : t.form.send}
      </Button>
    </form>
  );
}