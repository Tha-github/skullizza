import { SliceCut } from '@/components/decor/SliceCut';
import { SiteLayout } from '@/layout/SiteLayout';
import { About } from '@/sections/About/About';
import { FinalCta } from '@/sections/FinalCta/FinalCta';
import { Gallery } from '@/sections/Gallery/Gallery';
import { Hero } from '@/sections/Hero/Hero';
import { Highlights } from '@/sections/Highlights/Highlights';
import { InstagramCta } from '@/sections/InstagramCta/InstagramCta';
import { Location } from '@/sections/Location/Location';
import { Menu } from '@/sections/Menu/Menu';
import { SpecialDough } from '@/sections/SpecialDough/SpecialDough';

export function App() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <SliceCut from="light" to="dark" direction="fall" />
      <Highlights />
      <SliceCut from="dark" to="light" />
      <Menu />
      <SliceCut from="light" to="accent" />
      <SpecialDough />
      <Gallery />
      <SliceCut from="dark" to="accent" />
      <InstagramCta />
      <SliceCut from="accent" to="dark" direction="fall" />
      <Location />
      <SliceCut from="dark" to="accent" />
      <FinalCta />
      <SliceCut from="accent" to="dark" direction="fall" />
    </SiteLayout>
  );
}
