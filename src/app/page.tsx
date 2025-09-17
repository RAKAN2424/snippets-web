import { HeroSlider } from '@/components/hero-slider';
import { GallerySection } from '@/components/gallery-section';
import { NewLeadForm } from '@/components/new-lead-form';
import { ConnectSection } from '@/components/connect-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeroSlider />
      <main className="flex-grow">
        <GallerySection />
        <NewLeadForm />
        <ConnectSection />
      </main>
    </div>
  );
}
