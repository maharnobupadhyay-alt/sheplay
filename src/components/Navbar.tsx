import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  savedCount: number;
}

const PRIMARY_NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'explore', label: 'Explore' },
  { id: 'history', label: 'History' },
  { id: 'sponsorship', label: 'Sponsorships' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E6E2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-display text-xl font-bold tracking-tight text-[#24132B] hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48]"
        >
          HERPLAY
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (currentPage === 'details' && item.id === 'explore');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48] ${
                  isActive
                    ? 'text-[#E11D48] font-semibold'
                    : 'text-[#52495E] hover:text-[#24132B]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'dashboard' && savedCount > 0 && (
                  <span className="ml-1.5 font-mono-tabular text-xs text-[#0D9488]">
                    ({savedCount})
                  </span>
                )}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[21px] h-0.5 bg-[#E11D48]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (Desktop) + Mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('beginners')}
            className={`hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48] ${
              currentPage === 'beginners'
                ? 'bg-[#24132B] text-white'
                : 'bg-[#E11D48] text-white hover:bg-[#BE123C]'
            }`}
          >
            Beginner&apos;s Corner
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#24132B] hover:bg-[#F4F1F6] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile collapsible navigation drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#E6E2EA] bg-white px-4 py-3 space-y-1"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (currentPage === 'details' && item.id === 'explore');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#FFF1F4] text-[#E11D48] font-semibold'
                    : 'text-[#24132B] hover:bg-[#F4F1F6]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'dashboard' && savedCount > 0 && (
                  <span className="font-mono-tabular text-xs text-[#0D9488]">
                    {savedCount} saved
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#E6E2EA]">
            <button
              type="button"
              onClick={() => handleSelect('beginners')}
              className="w-full py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors text-center cursor-pointer"
            >
              Beginner&apos;s Corner
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
