
'use client';
import type { Metadata } from 'next';
import React, { useEffect, useRef } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ScrollingContactBar } from '@/components/scrolling-contact-bar';
import { LanguageProvider } from '@/context/language-context';

/*
export const metadata: Metadata = {
  title: 'SIGHTeg — Local Preview',
  description: 'Preview of the header page with an image slider',
};
*/


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.top = e.clientY + 'px';
      cursor.style.left = e.clientX + 'px';
    };

    const handleClick = () => {
      cursor.classList.add('animate-click-spin');
      setTimeout(() => {
        cursor.classList.remove('animate-click-spin');
      }, 600); // Must match animation duration
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <LanguageProvider>
      <html lang="en" dir="ltr" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=PT+Sans:wght@400;700&family=Cinzel:wght@400;700&family=Cairo:wght@400;700&family=Paytone+One&display=swap"
            rel="stylesheet"
          />
          <script src="https://apis.google.com/js/platform.js" async defer></script>
        </head>
        <body className="font-body text-foreground antialiased bg-background bg-grid-gif">
          <div ref={cursorRef} className="custom-cursor"></div>
          <div className="relative z-10 pb-16">
            {children}
          </div>
          <ScrollingContactBar />
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
