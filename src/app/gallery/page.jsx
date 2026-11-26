import PageBanner from '@/components/PageBanner';
import GallerySection from '@/components/GallerySection';

export const metadata = {
  title: 'Work Gallery',
  description:
    'Browse site excavation, rock cutting, and earthwork photographs from JVR Mining and Services.',
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Site Operations"
        title="Our Work Gallery"
        description="Scroll through real site excavation, rock breaking, and earthwork photographs with full-resolution lightbox preview."
        breadcrumb="Gallery"
      />
      <GallerySection />
    </>
  );
}
