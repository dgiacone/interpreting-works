import { useState } from 'react';

const TABS = [
  { id: 'bookings', label: 'Bookings', src: '/img/bookings.png', alt: 'Scheduling dashboard showing interpreter bookings with color-coded statuses' },
  { id: 'agenda',   label: 'Agenda',   src: '/img/agenda.png',   alt: 'Mobile calendar view showing scheduled interpreter sessions for March 2025' },
  { id: 'agencies', label: 'Agencies', src: '/img/agencies-tablet.png', alt: 'Tablet view of agency quality assurance management interface' },
];

export default function ScreenshotTabs() {
  const [active, setActive] = useState('bookings');

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full bg-gray-100 p-1 gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === tab.id
                  ? 'bg-white text-[#0D1B2A] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Browser chrome + screenshot */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5 bg-gray-100 rounded-t-xl px-4 py-3 border border-b-0 border-gray-200">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 max-w-xs">
            app.interpretingworks.com
          </div>
        </div>
        <div className="relative overflow-hidden rounded-b-xl border border-t-0 border-gray-200">
          {TABS.map(tab => (
            <img
              key={tab.id}
              src={tab.src}
              alt={tab.alt}
              width={1411}
              height={793}
              loading="lazy"
              className={`w-full object-cover transition-opacity duration-300 ${
                active === tab.id ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
