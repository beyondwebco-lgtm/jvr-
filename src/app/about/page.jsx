import PageBanner from '@/components/PageBanner';
import AboutSection from '@/components/AboutSection';
import CredentialsSection from '@/components/CredentialsSection';
import WhyChooseSection from '@/components/WhyChooseSection';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about JVR Mining and Services, proprietor Orsu Vijaya, and Class V (Civil) Contractor credentials in Hyderabad, Telangana.',
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Company Profile"
        title="About JVR Mining and Services"
        description="Registered Class V (Civil) Contractor based in Hyderabad, Telangana, delivering dependable earthwork, excavation, and heavy machinery services."
        breadcrumb="About Us"
      />
      <AboutSection />
      <CredentialsSection />
      <WhyChooseSection />
    </>
  );
}
