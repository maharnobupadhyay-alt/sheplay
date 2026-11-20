import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { MarathonEvent } from '../types';

interface RegisterInterestModalProps {
  event: MarathonEvent;
  isOpen: boolean;
  onClose: () => void;
  onBookmarkIfNeeded: (id: string) => void;
}

export const RegisterInterestModal: React.FC<RegisterInterestModalProps> = ({
  event,
  isOpen,
  onClose,
  onBookmarkIfNeeded,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(event.categories[0]?.distance ?? '5K');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('First-time runner');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    onBookmarkIfNeeded(event.id);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B0E20]/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
    >
      <div className="bg-white border border-[#E6E2EA] rounded-xl max-w-lg w-full p-6 sm:p-7 relative">
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close registration modal"
          className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center text-[#5C5669] hover:text-[#24132B] hover:bg-[#F4F1F6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#0D9488] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-[#0D9488]">
                Demo Interest Recorded · Saved to Your Dashboard
              </p>
              <h3 id="register-modal-title" className="font-display text-2xl font-bold text-[#24132B]">
                You&apos;re on the interest list, {fullName.split(' ')[0]}!
              </h3>
              <p className="text-sm text-[#5C5669] leading-relaxed">
                We&apos;ve logged your demo interest for the{' '}
                <span className="font-semibold text-[#24132B]">
                  {selectedCategory} wave
                </span>{' '}
                at {event.name} ({event.dateDisplay}) and bookmarked this event on your Dashboard.
              </p>
            </div>

            <div className="bg-[#FAF9FB] border border-[#E6E2EA] rounded-lg p-4 text-left text-xs text-[#5C5669] space-y-1">
              <p className="font-semibold text-[#24132B]">Prototype Notice</p>
              <p>
                This is a clickable frontend demonstration. No real registration payment or personal data transmission has occurred.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-2.5 px-5 rounded-lg text-sm font-semibold text-white bg-[#24132B] hover:bg-[#E11D48] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="pr-8 space-y-1">
              <p className="text-xs font-medium text-[#0D9488]">
                Demo Registration · {event.city}
              </p>
              <h3 id="register-modal-title" className="font-display text-xl font-bold text-[#24132B]">
                Register Interest — {event.name}
              </h3>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="demo-category" className="block text-sm font-medium text-[#24132B]">
                Select Race Distance
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {event.categories.map((cat) => {
                  const active = selectedCategory === cat.distance;
                  return (
                    <button
                      key={cat.distance}
                      type="button"
                      onClick={() => setSelectedCategory(cat.distance)}
                      className={`px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer ${
                        active
                          ? 'border-[#E11D48] bg-[#FFF1F4] text-[#24132B]'
                          : 'border-[#E6E2EA] bg-white text-[#52495E] hover:border-[#C9C1D1]'
                      }`}
                    >
                      <span className="block font-mono-tabular text-sm font-semibold">
                        {cat.distance}
                      </span>
                      <span className="block font-mono-tabular text-xs text-[#5C5669]">
                        {cat.feeInr === 0 ? 'Free' : `₹${cat.feeInr}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-medium text-[#24132B] mb-1">
                  Full Name
                </label>
                <input
                  id="demo-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Riya Sen"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label htmlFor="demo-email" className="block text-sm font-medium text-[#24132B] mb-1">
                  Email Address
                </label>
                <input
                  id="demo-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="riya@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="demo-experience" className="block text-sm font-medium text-[#24132B] mb-1">
                Running Experience
              </label>
              <select
                id="demo-experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] bg-white focus:outline-none focus:border-[#E11D48]"
              >
                <option value="First-time runner">First-time runner (starting with 3K / 5K)</option>
                <option value="Casual jogger">Casual jogger (1–2 runs per week)</option>
                <option value="Regular 10K+ runner">Regular 10K / Half Marathon runner</option>
              </select>
            </div>

            {error && (
              <p role="alert" className="text-xs font-medium text-[#BE123C]">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#52495E] hover:bg-[#F4F1F6] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors cursor-pointer"
              >
                Confirm Interest (Demo)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
