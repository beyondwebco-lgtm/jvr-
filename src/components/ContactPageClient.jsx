'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactSection from './ContactSection';

function ContactInner() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || '';
  return <ContactSection preselectedService={service} />;
}

export default function ContactPageClient() {
  return (
    <Suspense fallback={<ContactSection />}>
      <ContactInner />
    </Suspense>
  );
}
