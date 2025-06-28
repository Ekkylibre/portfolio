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
const MAX_SUBJECT_LENGTH = 100;
const MIN_SUBJECT_LENGTH = 3;
const SUBMIT_DELAY = 60000; // 60 secondes entre chaque soumission
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z\s-]{2,50}$/;

export function ContactForm({ language, translations: t }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
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
          ? 'Le sujet doit être plus détaillé'
          : 'Subject must be more detailed'
      };
    }

    // Validation du message
    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return {
        isValid: false,
        error: language === 'fr'
          ? 'Le message doit être plus détaillé'
          : 'Message must be more detailed'
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

  // Gestionnaire de changement pour les champs
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Fonction pour obtenir la classe de couleur basée sur la longueur
  const getLengthColorClass = (currentLength: number, maxLength: number) => {
    const percentage = (currentLength / maxLength) * 100;
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-orange-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-muted-foreground';
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

    // Récupération et nettoyage des données
    const name = sanitizeInput(formData.name);
    const email = sanitizeInput(formData.email);
    const subject = sanitizeInput(formData.subject);
    const message = sanitizeInput(formData.message);

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

      // Reset du formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
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
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="mt-2 p-3 w-full border border-muted rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
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
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-2 p-3 w-full border border-muted rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder={t.form.placeholders.email}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-lg font-medium text-muted-foreground">
          {t.form.subject}
        </label>
        <div className="relative">
          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={MAX_SUBJECT_LENGTH}
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="mt-2 p-3 w-full border border-muted rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder={t.form.placeholders.subject}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className={`text-xs ${getLengthColorClass(formData.subject.length, MAX_SUBJECT_LENGTH)}`}>
              {formData.subject.length}/{MAX_SUBJECT_LENGTH}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-lg font-medium text-muted-foreground">
          {t.form.message}
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={MAX_MESSAGE_LENGTH}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="mt-2 p-3 w-full border border-muted rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
            placeholder={t.form.placeholders.message}
          />
          <div className="absolute bottom-3 right-3">
            <span className={`text-xs ${getLengthColorClass(formData.message.length, MAX_MESSAGE_LENGTH)}`}>
              {formData.message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200" 
        disabled={isSubmitting}
      >
        <Send className="mr-2 h-5 w-5" />
        {isSubmitting ? (language === 'fr' ? 'Envoi...' : 'Sending...') : t.form.send}
      </Button>
    </form>
  );
}