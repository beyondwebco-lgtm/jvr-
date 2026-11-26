import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY_INFO } from '@/data/company';

export const metadata = {
  title: {
    default: 'JVR | JVR Mining and Services — Earthwork & Infrastructure Solutions',
    template: '%s | JVR Mining and Services',
  },
  description:
    'JVR Mining and Services (JVR Earthworks & Infrastructure) in Hyderabad, Telangana. Class V (Civil) Contractor specializing in earth cutting, excavation, soil filling, land leveling, Tata Hitachi PC210 excavator, air compressor, and tipper services.',
  keywords: [
    'JVR Mining and Services',
    'JVR Earthworks & Infrastructure',
    'earthwork services Hyderabad',
    'excavation contractor Telangana',
    'Tata Hitachi PC210 excavator',
    'soil filling backfilling',
    'land leveling grading',
    'tipper dumper services',
    'Class V Civil Contractor',
  ],
  openGraph: {
    title: 'JVR Mining and Services — Earthwork & Infrastructure Solutions',
    description: COMPANY_INFO.heroDescription,
    type: 'website',
    locale: 'en_IN',
    images: ['/images/jvr-logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
