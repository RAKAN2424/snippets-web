
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutUsSection } from "@/components/about-us-section";
import { GoogleMap } from "@/components/google-map";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function ConnectSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="contact" className="py-12 md:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">{t.tabAboutUs}</TabsTrigger>
            <TabsTrigger value="map">{t.tabOurLocation}</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <AboutUsSection />
          </TabsContent>
          <TabsContent value="map">
            <div className="aspect-video max-w-4xl mx-auto mt-6 rounded-lg overflow-hidden border border-border">
                <GoogleMap />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
