'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  User,
  Building2,
  Send,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Mail,
  Copy,
  Check,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import RevealOnScroll from './RevealOnScroll';
import { COMPANY_INFO } from '@/data/company';
import { SERVICES } from '@/data/services';

const INITIAL_FORM = {
  fullName: '',
  mobile: '',
  email: '',
  projectLocation: '',
  requiredService: '',
  message: '',
};

export default function ContactSection({ preselectedService = '' }) {
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    requiredService: preselectedService || '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [channelNotice, setChannelNotice] = useState('');
  const [submittedPayload, setSubmittedPayload] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, requiredService: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChannelNotice('');

    if (!form.fullName.trim() || !form.mobile.trim() || !form.projectLocation.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in your Full Name, Mobile Number, and Project Location.',
      });
      return;
    }

    setStatus({ type: 'submitting', message: 'Preparing your project enquiry...' });

    const payload = {
      ...form,
      company: COMPANY_INFO.officialName,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (COMPANY_INFO.contact.enquiryEndpoint) {
        const res = await fetch(COMPANY_INFO.contact.enquiryEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Submission failed');
      }

      setSubmittedPayload(payload);
      setStatus({
        type: 'success',
        message:
          'Thank you! Your project enquiry details have been recorded and formatted below.',
      });
      setForm(INITIAL_FORM);
    } catch {
      setStatus({
        type: 'error',
        message:
          'Could not reach the configured enquiry endpoint. You can copy your formatted enquiry below.',
      });
      setSubmittedPayload(payload);
    }
  };

  const handleDirectAction = (channel) => {
    if (channel === 'whatsapp') {
      if (COMPANY_INFO.contact.whatsapp) {
        const cleanDigits = COMPANY_INFO.contact.whatsapp.replace(/\D/g, '');
        const text = encodeURIComponent(
          `Hello ${COMPANY_INFO.officialName}, I would like to enquire about ${
            form.requiredService || 'earthwork and excavation services'
          }.`
        );
        window.open(`https://wa.me/${cleanDigits}?text=${text}`, '_blank', 'noopener,noreferrer');
      } else {
        setChannelNotice(
          'Official WhatsApp number is awaiting update in src/data/company.js. Please submit your details using the enquiry form.'
        );
      }
    }

    if (channel === 'call') {
      if (COMPANY_INFO.contact.phone) {
        window.location.href = `tel:${COMPANY_INFO.contact.phone}`;
      } else {
        setChannelNotice(
          'Official phone number is awaiting update in src/data/company.js. Please submit your details using the enquiry form.'
        );
      }
    }
  };

  const handleCopySummary = async () => {
    if (!submittedPayload) return;
    const summaryText = [
      `Enquiry for: ${COMPANY_INFO.officialName}`,
      `Name: ${submittedPayload.fullName}`,
      `Mobile: ${submittedPayload.mobile}`,
      `Email: ${submittedPayload.email || 'Not provided'}`,
      `Project Location: ${submittedPayload.projectLocation}`,
      `Required Service: ${submittedPayload.requiredService || 'General Earthwork Enquiry'}`,
      `Message: ${submittedPayload.message || 'N/A'}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's Start Your Project"
            subtitle="Looking for reliable earthwork and infrastructure services? Contact JVR Mining and Services today to discuss your project requirements."
            theme="light"
          />
        </div>

        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Address & Direct Contact Channels */}
          <div className="lg:col-span-5 bg-[#11171e] text-white rounded-sm p-5 sm:p-7 lg:p-9 border border-slate-800 space-y-6 sm:space-y-7">
            <div className="space-y-2 border-b border-slate-800 pb-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Corporate Office
              </span>
              <h3 className="text-2xl font-extrabold text-white">{COMPANY_INFO.officialName}</h3>
              <p className="text-xs text-slate-400 italic">&ldquo;{COMPANY_INFO.tagline}&rdquo;</p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">
                    Company
                  </span>
                  <span className="font-semibold text-white">{COMPANY_INFO.officialName}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">
                    Proprietor
                  </span>
                  <span className="font-semibold text-white">{COMPANY_INFO.proprietor}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block mb-0.5">
                    Address
                  </span>
                  <address className="not-italic text-slate-200 leading-relaxed">
                    {COMPANY_INFO.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-slate-300">
                    {COMPANY_INFO.contact.phone || 'Contact number to be updated'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">
                    Email
                  </span>
                  <span className="text-slate-300">
                    {COMPANY_INFO.contact.email || 'Email address to be updated'}
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp & Call Now Action Buttons */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDirectAction('whatsapp')}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-4 py-3 rounded-sm transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => handleDirectAction('call')}
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-4 py-3 rounded-sm transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Now
                </button>
              </div>

              {channelNotice && (
                <div className="p-3 rounded-sm bg-slate-900 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{channelNotice}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-sm p-5 sm:p-7 lg:p-9 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Project Enquiry Form</h3>
            <p className="text-sm text-slate-600 mb-6">
              Share your site location and required earthwork or machinery scope below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-sm text-sm text-slate-900 outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Mobile Number <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-sm text-sm text-slate-900 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-sm text-sm text-slate-900 outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="projectLocation"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Project Location <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="projectLocation"
                    name="projectLocation"
                    type="text"
                    required
                    value={form.projectLocation}
                    onChange={handleChange}
                    placeholder="e.g., Shaikpet, Hyderabad"
                    className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-sm text-sm text-slate-900 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="requiredService"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Required Service
                </label>
                <select
                  id="requiredService"
                  name="requiredService"
                  value={form.requiredService}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-sm text-sm text-slate-900 outline-none transition"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.shortTitle}>
                      {service.shortTitle}
                    </option>
                  ))}
                  <option value="Combined Earthwork & Machinery Package">
                    Combined Earthwork &amp; Machinery Package
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe site area, approximate excavation/filling volume, or machinery schedule..."
                  className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-sm text-sm text-slate-900 outline-none transition resize-y"
                />
              </div>

              {status.type === 'error' && (
                <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.type === 'success' && (
                <div className="p-4 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-bold">Enquiry Prepared Successfully</p>
                      <p className="text-emerald-800 text-xs mt-0.5">{status.message}</p>
                    </div>
                  </div>
                  {submittedPayload && (
                    <div className="bg-white border border-emerald-200 rounded-sm p-3 text-xs text-slate-700 space-y-1">
                      <p>
                        <strong>Name:</strong> {submittedPayload.fullName} &bull;{' '}
                        <strong>Mobile:</strong> {submittedPayload.mobile}
                      </p>
                      <p>
                        <strong>Location:</strong> {submittedPayload.projectLocation} &bull;{' '}
                        <strong>Service:</strong>{' '}
                        {submittedPayload.requiredService || 'General Earthwork'}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-sm font-semibold hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            Copied Summary
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            Copy Enquiry Summary
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status.type === 'submitting'}
                  className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-extrabold text-sm px-7 py-3.5 rounded-sm transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {status.type === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                </button>
                <div className="grid grid-cols-2 sm:flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleDirectAction('whatsapp')}
                    className="inline-flex items-center justify-center gap-2 bg-[#11171e] hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3.5 rounded-sm transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDirectAction('call')}
                    className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-amber-500 text-slate-800 font-bold text-sm px-5 py-3.5 rounded-sm transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Call Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
