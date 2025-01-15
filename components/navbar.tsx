'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from './mode-toggle';
import { LanguageToggle } from './language-toggle';
import { Language, translations } from '@/lib/i18n';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const navigation = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'portfolio', href: '#portfolio' },
  { name: 'contact', href: '#contact' },
];

export function Navbar({ currentLanguage, onLanguageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const t = translations[currentLanguage];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-200 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Dany XIONG
            </Link>
          </div>
          
          {/* Desktop navigation - Maintenant centré */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {t.nav[item.name as keyof typeof t.nav]}
              </Link>
            ))}
          </div>

          {/* Actions à droite */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            <ModeToggle />
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center space-x-4 md:hidden ml-auto">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {t.nav[item.name as keyof typeof t.nav]}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}