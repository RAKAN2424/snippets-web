

'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function AboutUsSection() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="text-center mt-6 max-w-4xl mx-auto">
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="p-0 mb-6 text-center">
                    <CardTitle className="text-3xl mb-4 text-card-foreground font-headline">{t.aboutUsTitle}</CardTitle>
                    <div className="relative h-64 w-full rounded-lg overflow-hidden border border-border">
                        <Image
                            src="https://i.ibb.co/ZzBR3fDD/Untitled-design.png"
                            alt={t.aboutUsTitle}
                            fill
                            className="object-cover"
                            data-ai-hint="modern building"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 text-base text-justify text-foreground/80 space-y-4">
                    <p>
                        {t.aboutUsP1}
                    </p>
                    <p>
                        {t.aboutUsP2}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
