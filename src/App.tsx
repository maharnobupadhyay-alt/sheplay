import { useEffect, useState } from 'react';
import { SAMPLE_MARATHONS } from './data/mockMarathons';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { MarathonDetailsPage } from './pages/MarathonDetailsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SponsorshipHubPage } from './pages/SponsorshipHubPage';
import { BeginnersCornerPage } from './pages/BeginnersCornerPage';

const SAVED_STORAGE_KEY = 'herplay_saved_marathons_v1';
const CHECKLIST_STORAGE_KEY = 'herplay_beginner_checklist_v1';

const DEFAULT_SAVED_IDS = ['mumbai-her-stride-2026', 'kolkata-maidan-dawn-2026'];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [previousPage, setPreviousPage] = useState<PageId>('explore');
  const [selectedEventId, setSelectedEventId] = useState<string>(SAMPLE_MARATHONS[0].id);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore localStorage read failures
    }
    return DEFAULT_SAVED_IDS;
  });

  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore localStorage read failures
    }
    return ['w1-t1'];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // ignore localStorage write failures
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completedChecklistIds));
    } catch {
      // ignore localStorage write failures
    }
  }, [completedChecklistIds]);

  const handleNavigate = (page: PageId) => {
    if (page !== 'details') {
      setPreviousPage(page);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (eventId: string) => {
    if (currentPage !== 'details') {
      setPreviousPage(currentPage);
    }
    setSelectedEventId(eventId);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (eventId: string) => {
    setSavedIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleBookmarkIfNeeded = (eventId: string) => {
    setSavedIds((prev) => (prev.includes(eventId) ? prev : [...prev, eventId]));
  };

  const handleToggleChecklistTask = (taskId: string) => {
    setCompletedChecklistIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleResetChecklist = () => {
    setCompletedChecklistIds([]);
  };

  const selectedEvent =
    SAMPLE_MARATHONS.find((m) => m.id === selectedEventId) ?? SAMPLE_MARATHONS[0];

  const backLabelMap: Record<PageId, string> = {
    home: 'Back to Home',
    dashboard: 'Back to Dashboard',
    explore: 'Back to Explore Marathons',
    details: 'Back to Explore Marathons',
    history: 'Back to History',
    sponsorship: 'Back to Sponsorship Hub',
    beginners: "Back to Beginner's Corner",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FB] text-[#24132B]">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        savedCount={savedIds.length}
      />

      {/* Non-sticky subtle Prototype Mode notice banner */}
      <div className="bg-[#F4F1F6] border-b border-[#E6E2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs text-[#52495E] flex flex-wrap items-center justify-between gap-2">
          <p>
            <span className="font-semibold text-[#24132B]">Prototype Mode:</span> All event listings, winners, prize money, and sponsor details shown are sample/placeholder data for demonstration purposes.
          </p>
        </div>
      </div>

      <main className="flex-1 pb-8">
        {currentPage === 'home' && (
          <HomePage
            marathons={SAMPLE_MARATHONS}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            marathons={SAMPLE_MARATHONS}
            savedIds={savedIds}
            completedChecklistIds={completedChecklistIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'explore' && (
          <ExplorePage
            marathons={SAMPLE_MARATHONS}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentPage === 'details' && (
          <MarathonDetailsPage
            event={selectedEvent}
            isSaved={savedIds.includes(selectedEvent.id)}
            backLabel={backLabelMap[previousPage] ?? 'Back to Explore'}
            onBack={() => handleNavigate(previousPage === 'details' ? 'explore' : previousPage)}
            onToggleSave={handleToggleSave}
            onBookmarkIfNeeded={handleBookmarkIfNeeded}
          />
        )}

        {currentPage === 'history' && <HistoryPage />}

        {currentPage === 'sponsorship' && <SponsorshipHubPage />}

        {currentPage === 'beginners' && (
          <BeginnersCornerPage
            completedChecklistIds={completedChecklistIds}
            onToggleChecklistTask={handleToggleChecklistTask}
            onResetChecklist={handleResetChecklist}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
