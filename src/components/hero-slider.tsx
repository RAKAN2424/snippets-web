
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, googleProvider } from '@/lib/firebase';


const slides = [
  {
    id: 'slide1',
    imgSrc: 'https://i.ibb.co/fVHN4MtB/3.png',
    subtagKey: 'heroSubtag1',
    subtagClassName: 'text-sky-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]',
    ctaKey: 'heroCtaCallNow',
    ctaLink: 'https://wa.me/201099993903',
  },
  {
    id: 'slide2',
    imgSrc: 'https://i.ibb.co/KcVkRWHj/Whisk-mvwojztz5ywzmvjytemm0gtlmvzm00ynwijyteg.jpg',
    subtagKey: 'heroSubtag2',
    ctaKey: 'heroCtaContactUs',
    ctaLink: '#contact',
  },
  {
    id: 'slide3',
    imgSrc: 'https://i.ibb.co/spJtRNk0/17b6816d-9bcd-46c9-b023-35786b636125.jpg',
    subtagKey: 'heroSubtag3',
    ctaKey: 'heroCtaContactUs',
    ctaLink: 'https://wa.me/201099993903',
  },
  {
    id: 'slide4',
    imgSrc: 'https://i.ibb.co/qMBHN1MC/Whisk-547472c4b29df5faed54d1b445fdd235eg.png',
    subtagKey: 'heroSubtag4',
    ctaKey: 'heroCtaViewGallery',
    ctaLink: '#gallery',
  },
  {
    id: 'slide5',
    imgSrc: 'https://i.ibb.co/dJML7pMG/Dark-Blue-and-Gold-Minimalist-Real-Estate-Facebook-Ad.png',
    subtagKey: 'heroSubtag5',
    ctaKey: 'heroCtaAboutUs',
    ctaLink: 'https://wa.me/201099993903',
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];


  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleSignIn = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Signed in user:", user);
        console.log("Access Token:", token);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Sign in error:", errorCode, errorMessage);
        // ...
      });
  };

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setInterval(nextSlide, 4500);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, nextSlide, resetTimeout]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const stopAutoplay = () => resetTimeout();
  const startAutoplay = useCallback(() => {
    resetTimeout();
    timeoutRef.current = setInterval(nextSlide, 4500);
  }, [nextSlide, resetTimeout]);

  return (
    <header
      className="relative overflow-hidden h-dvh bg-black text-white group"
      role="banner"
      aria-label="Header Slider"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="absolute top-0 left-0 z-20 w-40 h-40 -mt-10">
        <Link href="/" className="relative block w-full h-full">
          <Image
            src="https://i.ibb.co/ymZ86shD/Untitled-design-1.gif"
            alt="SIGHTeg Logo"
            fill
            className="object-contain"
            unoptimized
          />
        </Link>
      </div>
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <Button variant="outline" size="sm" onClick={handleSignIn} className="bg-transparent text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground">
            Sign in with Google
        </Button>
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="bg-transparent text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground">
            {language === 'en' ? 'العربية' : 'English'}
        </Button>
      </div>
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={currentIndex !== index}
          >
            <Image
              src={slide.imgSrc}
              alt={t[slide.subtagKey as keyof typeof t]}
              fill
              sizes="100vw"
              className={cn(
                'object-cover transition-transform ease-out duration-[6s]',
                currentIndex === index ? 'scale-110' : 'scale-100'
              )}
              priority={index === 0}
            />
          </div>
        ))}
         {/* Added gradient overlay to fade the bottom of the hero section */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
         <div className="relative h-full flex flex-col items-center justify-end pb-20 md:pb-28 text-center">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <h1 className="font-anton uppercase text-6xl md:text-8xl mb-8 text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.75)]">
                    {t.heroTitle}
                </h1>
                <div className="relative h-24 md:h-28">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={cn(
                                'absolute inset-0 transition-all duration-1000 ease-in-out',
                                currentIndex === index 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-4'
                            )}
                        >
                            <p className={cn("font-body text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-foreground/80 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]", (slide as any).subtagClassName)}>{t[slide.subtagKey as keyof typeof t]}</p>
                             <Button asChild variant="outline" className="bg-transparent border-primary/40 hover:bg-accent hover:text-accent-foreground rounded-full px-8 py-3 h-auto text-lg text-primary">
                                <Link href={slide.ctaLink} target={slide.ctaLink.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">{t[slide.ctaKey as keyof typeof t]}</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute top-1/2 -translate-y-1/2 left-4 h-11 w-11 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute top-1/2 -translate-y-1/2 right-4 h-11 w-11 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentIndex === index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2.5 w-2.5 rounded-full cursor-pointer transition-colors',
              currentIndex === index ? 'bg-accent' : 'bg-foreground/45 hover:bg-foreground/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </header>
  );
}
