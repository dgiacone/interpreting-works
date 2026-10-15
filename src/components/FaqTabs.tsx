import { useState } from 'react';

const REQUESTERS = [
  {
    q: 'What is InterpretingWorks?',
    a: 'InterpretingWorks is a secure scheduling platform that helps you request, manage, and track interpreter services quickly and efficiently. It automates scheduling, confirmations, reporting, and billing — all in one place.',
  },
  {
    q: 'How do I request an interpreter?',
    a: 'Simply log into your InterpretingWorks account, select "New Request," and fill in the required details such as date, time, language, and location. You can also attach case numbers or internal references if needed.',
  },
  {
    q: 'Can I choose a specific interpreter?',
    a: 'Yes. You can request a specific interpreter if they meet your project or program\'s requirements and are available. Otherwise, the system automatically assigns one based on credentials, proximity, and availability.',
  },
  {
    q: 'How much does it cost to use the system?',
    a: 'There are no setup or licensing fees to access InterpretingWorks. The platform is included as part of the interpreting services provided by Language Link. Agencies only pay for completed interpreting assignments according to the agreed contract rates; the use of the system, reporting, and support tools is included at no additional cost.',
  },
  {
    q: 'How does electronic check-in/out work?',
    a: 'Interpreters check in and out electronically using geo-location verification, ensuring accurate start and end times and full transparency for billing and compliance.',
  },
  {
    q: 'Can I track assignment status in real time?',
    a: 'Yes. The Dashboard provides live updates for all pending, active, and completed assignments, so you always know the status of your requests.',
  },
  {
    q: 'How do I generate reports?',
    a: 'You can create and export reports instantly through our Unlimited Report Functionality, filter by language, location, requester, or date to view performance and billing summaries.',
  },
  {
    q: 'Who do I contact for help?',
    a: 'For support, contact support@mylanguagelink.org or call (800) 905-0896. Our team is available to assist with any technical or scheduling questions.',
  },
  {
    q: 'Does the system follow security protocols?',
    a: 'Yes. InterpretingWorks is built with enterprise-grade security and compliance standards. All data is encrypted in transit and at rest, and the platform complies with HIPAA, CLAS, and applicable state and federal privacy regulations. Access is role-based to ensure that only authorized users can view sensitive information, and all activities are logged for auditing and accountability.',
  },
];

const INTERPRETERS = [
  {
    q: 'How do I log in?',
    a: 'Once registered, you\'ll receive an email with your login credentials and portal link. Log in to view available assignments, confirm requests, and manage your schedule.',
  },
  {
    q: 'How will I receive assignments?',
    a: 'You\'ll receive automatic notifications by email or text whenever a new assignment matches your language, credentials, and availability. You can accept or decline directly through the portal.',
  },
  {
    q: 'What is the electronic check-in/out feature?',
    a: 'When you arrive at an assignment, you\'ll check in electronically using your phone\'s geo-location. At the end, you check out the same way, confirming exact start and end times for accurate payment.',
  },
  {
    q: 'When will I get paid?',
    a: 'Payments are processed according to contract terms, typically within 15 days after client payment is received by InterpretingWorks. You can view your payment history in your dashboard.',
  },
  {
    q: 'Can I update my availability?',
    a: 'Yes. You can update your availability in real time, so the system only offers assignments that fit your schedule.',
  },
  {
    q: 'How do I upload compliance documents?',
    a: 'Go to your profile and upload the required documents, such as background checks, HIPAA or CLAS certificates, and driver\'s license. The system will notify you before any document expires.',
  },
  {
    q: 'Who do I contact if I have a technical issue?',
    a: 'For help logging in, reporting hours, or troubleshooting, contact support@mylanguagelink.org or call (800) 905-0896.',
  },
  {
    q: 'How much does it cost to use the system?',
    a: 'InterpretingWorks is completely free for interpreters. There are no fees to register, accept jobs, or access your schedule and payment information. The platform is provided by Language Link as part of your partnership to simplify scheduling, reporting, and compliance management.',
  },
  {
    q: 'Does the system follow security protocols?',
    a: 'Absolutely. InterpretingWorks uses secure encryption and multi-layer authentication to protect your personal data, assignments, and payment details. The system meets HIPAA and industry confidentiality standards, so your information and your clients\' information are always handled safely and responsibly.',
  },
];

function AccordionItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-gray-100 last:border-0 transition-colors ${open ? 'bg-[#FFF0F1]/40' : 'bg-white'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`text-base font-semibold transition-colors ${open ? 'text-[#DC3C52]' : 'text-[#0D1B2A]'}`}>
          {q}
        </span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-[#DC3C52] text-white' : 'bg-gray-100 text-gray-400'}`}>
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqTabs() {
  const [tab, setTab] = useState<'requesters' | 'interpreters'>('requesters');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = tab === 'requesters' ? REQUESTERS : INTERPRETERS;

  function switchTab(t: 'requesters' | 'interpreters') {
    setTab(t);
    setOpenIdx(0);
  }

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-full bg-gray-100 p-1 gap-1">
          {([
            { id: 'requesters', label: 'For Requesters' },
            { id: 'interpreters', label: 'For Interpreters' },
          ] as const).map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => switchTab(t.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === t.id
                  ? 'bg-white text-[#0D1B2A] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-labels for requesters */}
      {tab === 'requesters' && (
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {['Agencies', 'Courts', 'Healthcare Partners'].map(label => (
            <span key={label} className="rounded-full border border-[#DC3C52]/30 bg-[#FFF0F1] px-4 py-1.5 text-xs font-semibold text-[#DC3C52]">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Accordion */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            q={item.q}
            a={item.a}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
