import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { companies, mockApplications, mockStudentProfile } from './data';
import { AppHeader, MobileDrawer, ExplainPanel, MobileBottomNav } from './components/layout';
import { DetailDrawer } from './pages/DiscoverPages';
import DiscoverPage, { RolesPage } from './pages/DiscoverPages';
import { DashboardPage, EventsPage, FeedbackPage, SupportPage, AccessPage } from './pages/MainPages';
import ProfilePage from './pages/ProfilePage';
import CareerCheckPage from './pages/CareerCheckPage';
import ApplicationWorkspace from './pages/ApplicationWorkspace';
import AdminWorkspace from './pages/AdminPages';

function App() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  // ─── State ───────────────────────────────────────────────────────────
  const [page, setPage] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [activeSignals, setActiveSignals] = useState([]);
  const [saved, setSaved] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);
  const [profile, setProfile] = useState(mockStudentProfile);
  const [careerCheck, setCareerCheck] = useState(null);
  const [applications, setApplications] = useState(mockApplications);
  const [selected, setSelected] = useState(null);
  const [explainOpen, setExplainOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // ─── Handlers ────────────────────────────────────────────────────────
  const toggleSignal = signal => setActiveSignals(c => c.includes(signal) ? c.filter(v => v !== signal) : [...c, signal]);
  const clearFilters = () => { setQuery(''); setActiveSignals([]); };
  const toggleSaved = id => setSaved(c => c.includes(id) ? c.filter(v => v !== id) : [...c, id]);
  const savedCompanies = companies.filter(c => saved.includes(c.id));

  // Referral request: creates an application with hbridge_review mode
  const askHBridge = company => {
    // Add to referrals list
    setReferrals(c => c.some(r => r.id === company.id) ? c : [...c, company]);
    // Create application with hbridge_review mode (prevent duplicates)
    setApplications(prev => {
      const exists = prev.some(a => a.company_id === company.id && (a.application_mode === 'hbridge_review' || a.application_mode === 'hbridge_referral'));
      if (exists) return prev;
      return [...prev, {
        id: `app-ref-${Date.now()}`, student_id: 'sp-001', company_id: company.id, job_id: null,
        external_company_name: null, external_job_title: null,
        application_source: 'hbridge', application_mode: 'hbridge_review',
        student_tracking_status: 'planning_to_apply', official_hbridge_status: 'hbridge_review_required',
        referral_requested_at: new Date().toISOString(), next_action_date: null,
        student_note: `Requested H-bridge referral support for ${company.name}.`,
        es_questions: [], interview_memos: [],
        created_at: new Date().toISOString()
      }];
    });
    setSelected(null);
    setPage('journey');
  };

  const joinEvent = id => setJoinedEvents(c => c.includes(id) ? c : [...c, id]);
  const sendSupport = req => setSupportRequests(c => [...c, req]);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <Box className="ambient-background noise-layer">
      <Box className="main-shell">
        <AppHeader page={page} setPage={setPage} saved={saved} setMobileNavOpen={setMobileNavOpen} />

        {page === 'dashboard' && <DashboardPage profile={profile} careerCheck={careerCheck} savedCompanies={savedCompanies} referrals={referrals} applications={applications} joinedEvents={joinedEvents} setPage={setPage} onOpen={setSelected} />}
        {page === 'discover' && <DiscoverPage query={query} setQuery={setQuery} activeSignals={activeSignals} toggleSignal={toggleSignal} clearFilters={clearFilters} saved={saved} onSave={toggleSaved} onOpen={setSelected} onOpenExplain={() => setExplainOpen(true)} />}
        {page === 'roles' && <RolesPage onOpen={setSelected} />}
        {page === 'career-check' && <CareerCheckPage careerCheck={careerCheck} setCareerCheck={setCareerCheck} setPage={setPage} />}
        {page === 'events' && <EventsPage joinedEvents={joinedEvents} onJoin={joinEvent} onCreateReferral={askHBridge} setPage={setPage} />}
        {page === 'journey' && <ApplicationWorkspace savedCompanies={savedCompanies} referrals={referrals} applications={applications} setApplications={setApplications} onOpen={setSelected} onRefer={askHBridge} setPage={setPage} />}
        {page === 'feedback' && <FeedbackPage setPage={setPage} />}
        {page === 'support' && <SupportPage onSend={sendSupport} setPage={setPage} />}
        {page === 'profile' && <ProfilePage setPage={setPage} profile={profile} setProfile={setProfile} />}
        {page === 'access' && <AccessPage setPage={setPage} />}
        {page === 'admin' && <AdminWorkspace referrals={referrals} supportRequests={supportRequests} setPage={setPage} />}

        <DetailDrawer company={selected} saved={selected ? saved.includes(selected.id) : false} onClose={() => setSelected(null)} onSave={toggleSaved} onRefer={askHBridge} onOpenExplain={() => setExplainOpen(true)} />
        <ExplainPanel open={explainOpen} onClose={() => setExplainOpen(false)} />
        <MobileDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} page={page} setPage={setPage} />
        {mobile && <MobileBottomNav page={page} setPage={setPage} />}
      </Box>
    </Box>
  );
}

export default App;
