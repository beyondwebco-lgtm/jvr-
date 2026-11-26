import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CredentialsSection from '@/components/CredentialsSection';
import ServicesSection from '@/components/ServicesSection';
import MachinerySection from '@/components/MachinerySection';
import WhyChooseSection from '@/components/WhyChooseSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection compact />
      <CredentialsSection />
      <ServicesSection />
      <MachinerySection />
      <WhyChooseSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
