
'use client';

import React from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingForm } from '@/components/booking-form';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

const properties = [
  { 
    id: 1, 
    type: 'sale', 
    titleKey: 'propTitle1',
    price: '$500,000', 
    image: 'https://i.ibb.co/mCXMSSKW/Whisk-7eb8fcd38f784ec80f54b416f43923e5dr.jpg', 
    hint: 'modern apartment',
    detailsKeys: ['prop1Detail1', 'prop1Detail2', 'prop1Detail3', 'prop1Detail4', 'prop1Detail5', 'prop1Detail6', 'prop1Detail7']
  },
  { 
    id: 2, 
    type: 'rent', 
    titleKey: 'propTitle2', 
    price: '7,303,000 LE', 
    image: 'https://i.ibb.co/F4KZVW2w/Whisk-a5271090ae21e90b6cc417a435a0c9c3dr.jpg', 
    hint: 'suburban house',
    detailsKeys: ['prop2Detail1', 'prop2Detail2', 'prop2Detail3', 'prop2Detail4', 'prop2Detail5', 'prop2Detail6', 'prop2Detail7', 'prop2Detail8', 'prop2Detail9']
  },
  { 
    id: 3, 
    type: 'sale', 
    titleKey: 'propTitle3', 
    price: '35,760,000 LE', 
    image: 'https://i.ibb.co/BV0R1bVh/Whisk-ff8a25183e6593f8e80440e1f16936f5dr.jpg', 
    hint: 'luxury towers',
    detailsKeys: ['prop3Detail1', 'prop3Detail2', 'prop3Detail3', 'prop3Detail4', 'prop3Detail5', 'prop3Detail6', 'prop3Detail7', 'prop3Detail8']
  },
  { 
    id: 4, 
    type: 'sale', 
    titleKey: 'propTitle4', 
    price: '9,187,000 LE', 
    image: 'https://i.ibb.co/Hfb5yLB7/Whisk-b1b928524b38ce0bb1c4c42721665c96dr.jpg', 
    hint: 'seaside residence',
    detailsKeys: ['prop4Detail1', 'prop4Detail2', 'prop4Detail3', 'prop4Detail4', 'prop4Detail5', 'prop4Detail6', 'prop4Detail7', 'prop4Detail8']
  },
];

const RenderPropertyList = ({ filterType }: { filterType: string }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const filteredProperties = properties.filter(p => filterType === 'all' || p.type === filterType || (filterType === 'featured' && p.id === 3));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {filteredProperties.map(property => {
        const title = t[property.titleKey as keyof typeof t] || 'Property';
        return (
          <Card key={property.id} className="bg-card/80 overflow-hidden group flex flex-col border-border/60 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
            <div className="relative h-56">
              <Image
                src={property.image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={property.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-bold text-lg text-card-foreground">{title}</h3>
              <p className="text-accent font-semibold text-base mb-2">💰 {property.price}</p>
              {property.detailsKeys && (
                  <ul className="text-sm text-foreground/80 space-y-1 list-disc list-inside">
                      {property.detailsKeys.map((detailKey, index) => (
                          <li key={index}>🏠 {t[detailKey as keyof typeof t]}</li>
                      ))}
                  </ul>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <BookingForm propertyTitle={title}>
                <Button className="w-full">{t.bookViewing}</Button>
              </BookingForm>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export function GallerySection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="gallery" className="py-12 md:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-paytone text-3xl md:text-4xl font-bold mb-8 text-card-foreground">{t.galleryTitle}</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="all">{t.tabAll}</TabsTrigger>
            <TabsTrigger value="sale">{t.tabForSale}</TabsTrigger>
            <TabsTrigger value="rent">{t.tabForRent}</TabsTrigger>
            <TabsTrigger value="featured">{t.tabFeatured}</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <RenderPropertyList filterType='all' />
          </TabsContent>
          <TabsContent value="sale">
            <RenderPropertyList filterType='sale' />
          </TabsContent>
          <TabsContent value="rent">
            <RenderPropertyList filterType='rent' />
          </TabsContent>
          <TabsContent value="featured">
             <RenderPropertyList filterType='featured' />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
