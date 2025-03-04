'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Download, Send, Mail, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import { Language, translations } from '@/lib/i18n';
import { ContactForm } from '@/components/contact-form';

export default function Home() {
  const [language, setLanguage] = useState<Language>('fr');

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  const t = translations[language];

  return (
    <main className="min-h-screen bg-background">
      <Navbar currentLanguage={language} onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8" id="home">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <a href="#contact">
                  <Send className="mr-2 h-4 w-4" />
                  {t.hero.contactButton}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/CV_Dany_XIONG.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  {t.hero.downloadCV}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me & Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="flex-shrink-0 w-64 h-64 rounded-full overflow-hidden">
              <Image
                src="/profile-pic.png"
                alt="Profile Photo"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">{t.about.title}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t.about.description}
              </p>
              <h3 className="text-2xl font-semibold mb-4">{t.about.skills}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Next.js', 'TypeScript', 'React.js', 'Tailwind CSS', 'Git/GitHub', 'Redux', 'PostgreSQL', 'API REST'].map((skill) => (
                  <div
                    key={skill}
                    className="p-4 text-center bg-muted/50 rounded-lg hover:bg-muted transition-colors shadow-md"
                  >
                    <h4 className="font-medium">{skill}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.portfolio.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.portfolio.projects.map((project, i) => (
              <div
                key={i}
                className="group relative bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      {t.portfolio.demoButton}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50" id="contact">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">{t.contact.title}</h2>
          <div className="mt-12">
            <ContactForm language={language} translations={t.contact} />
          </div>

          <div className="mt-12 text-lg text-muted-foreground">
            <div className="flex justify-center gap-8 mt-4">
              <a href="mailto:dany.xiong.dev@outlook.fr" className="text-muted-foreground hover:text-primary" target='_blank'>
                <Mail className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/dany-xiong-a66a2529a/" className="text-muted-foreground hover:text-primary" target='_blank'>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/Ekkylibre" className="text-muted-foreground hover:text-primary" target='_blank'>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dany XIONG. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}