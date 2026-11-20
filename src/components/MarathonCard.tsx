import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { MarathonEvent } from '../types';
import { SafeImage } from './SafeImage';

interface MarathonCardProps {
  event: MarathonEvent;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const MarathonCard: React.FC<MarathonCardProps> = ({
  event,
  isSaved,
  onToggleSave,
  onViewDetails,
}) => {
  const primaryLevel = event.isBeginnerRecommended
    ? 'Beginner-Friendly'
    : event.experienceLevels[0];

  return (
    <article className="group bg-white border border-[#E6E2EA] rounded-xl overflow-hidden flex flex-col transition-colors duration-150 hover:border-[#C9C1D1]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F1F6]">
        <SafeImage
          src={event.imageUrl}
          alt={`${event.name} in ${event.city}`}
          title={event.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(event.id);
          }}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${event.name} from saved events` : `Save ${event.name} to favourites`}
          className={`absolute top-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48] ${
            isSaved
              ? 'bg-[#E11D48] text-white'
              : 'bg-white/95 text-[#24132B] hover:text-[#E11D48]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Clean unboxed typographic metadata line (no pill capsules) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#5C5669] mb-2">
          <span className="text-[#24132B] font-semibold">{event.city}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-tabular">{event.dateDisplay}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#0D9488] font-medium">Sample Data</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-[#24132B] leading-snug mb-2">
          {event.name}
        </h3>

        <p className="text-sm text-[#5C5669] leading-relaxed line-clamp-2 mb-4">
          {event.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-[#ECE8F0] space-y-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-mono-tabular font-semibold text-[#24132B]">
              {event.distances.join(' / ')}
            </span>
            <span className="text-[#5C5669]">
              {primaryLevel}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="font-mono-tabular text-sm font-semibold text-[#24132B]">
              {event.startingFeeLabel}
            </span>

            <button
              type="button"
              onClick={() => onViewDetails(event.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#24132B] hover:bg-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
