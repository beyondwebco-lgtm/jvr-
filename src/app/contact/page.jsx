import PageBanner from '@/components/PageBanner';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata = {
  title: 'Contact Us',
  description:
    'Contact JVR Mining and Services in Shaikpet, Film Nagar, Hyderabad for earthwork, excavation, soil filling, land leveling, and heavy machinery services.',
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Start Your Project"
        title="Contact JVR Mining and Services"
        description="Reach out for earth cutting, excavation, soil filling, land leveling, or heavy machinery requirements in Hyderabad and Telangana."
        breadcrumb="Contact Us"
      />
      <ContactPageClient />
    </>
  );
}
