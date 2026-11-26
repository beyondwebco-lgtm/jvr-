import PageBanner from '@/components/PageBanner';
import GallerySection from '@/components/GallerySection';

export const metadata = {
  title: 'Work Gallery',
  description:
    'Browse earth cutting, excavation, soil filling, land leveling, Tata Hitachi PC210, air compressor, and tipper transportation visuals.',
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Visual Portfolio"
        title="Our Work Gallery"
        description="Filter across earthwork operations and heavy machinery categories, with full-resolution lightbox preview."
        breadcrumb="Gallery"
      />
      <GallerySection />
    </>
  );
}
