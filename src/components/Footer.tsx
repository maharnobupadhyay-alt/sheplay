import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#E6E2EA] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-[#E6E2EA]">
          <div className="max-w-md space-y-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-lg font-bold tracking-tight text-[#24132B] hover:text-[#E11D48] transition-colors cursor-pointer"
            >
              HERPLAY
            </button>
            <p className="text-sm text-[#5C5669] leading-relaxed">
              Women&apos;s Sports Discovery &amp; Opportunity Platform — helping first-time runners discover welcoming 3K, 5K, 10K, and marathon events across India.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3 text-sm">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-left text-[#52495E] hover:text-[#E11D48] transition-colors whitespace-nowrap cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="text-left text-[#52495E] hover:text-[#E11D48] transition-colors whitespace-nowrap cursor-pointer"
            >
              Runner Dashboard
            </button>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="text-left text-[#52495E] hover:text-[#E11D48] transition-colors whitespace-nowrap cursor-pointer"
            >
              Explore Marathons
            </button>
            <button
              type="button"
              onClick={() => onNavigate('history')}
              className="text-left text-[#52495E] hover:text-[#E11D48] transition-colors whitespace-nowrap cursor-pointer"
            >
              Marathon History
            </button>
            <button
              type="button"
              onClick={() => onNavigate('sponsorship')}
              className="text-left text-[#52495E] hover:text-[#E11D48] transition-colors whitespace-nowrap cursor-pointer"
            >
              Sponsorship Hub
            </button>
            <button
              type="button"
              onClick={() => onNavigate('beginners')}
              className="text-left text-[#52495E] hover:text-[#E11D48] transition-colors whitespace-nowrap cursor-pointer"
            >
              Beginner&apos;s Corner
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#5C5669]">
          <p className="leading-relaxed">
            <span className="font-semibold text-[#24132B]">Prototype Mode:</span> All event listings, winners, prize money, and sponsor details shown are sample/placeholder data for demonstration purposes.
          </p>
          <p className="whitespace-nowrap shrink-0">HERPLAY Frontend Prototype</p>
        </div>
      </div>
    </footer>
  );
};
