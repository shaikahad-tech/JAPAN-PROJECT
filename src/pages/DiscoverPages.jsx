import { useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Avatar, Box, Button, Card, CardContent, Chip, Divider, Drawer, FormControlLabel, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Switch, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ApartmentRounded, ArrowOutwardRounded, AutoAwesomeRounded, BookmarkAddRounded, BookmarkRounded, BusinessCenterRounded, CloseRounded, Diversity3Rounded, FilterAltRounded, HubRounded, InsightsRounded, KeyboardArrowDownRounded, NorthEastRounded, PsychologyAltRounded, RouteRounded, SearchRounded, TuneRounded, VerifiedRounded, WorkspacesRounded } from '@mui/icons-material';
import { SectionLabel, SignalThread } from '../components/shared';
import { companies, filterGroups, jobs, promptSuggestions, ENUMS } from '../data';

const insightCopy = {
  creative: 'Your interest in creative work brings portfolio-led teams closer to the surface.',
  technology: 'Compass is prioritising technology teams where learning is visible in the role design.',
  making: 'Compass is looking for practical roles where you can see the impact of what you build.',
  people: 'Compass is surfacing people-centred business paths with broad collaboration.',
  care: 'Compass is highlighting purpose-led teams with thoughtful specialist pathways.',
  regional: 'Your regional-work preference is shaping the companies shown first.',
  flexible: 'Location flexibility is being treated as a signal, not as a requirement.',
  language: 'Language context is shown transparently so you can judge fit on your own terms.',
  support: 'Compass is prioritising teams that make relocation and onboarding easier to understand.',
  community: 'Community connection is helping Compass surface teams that work closely with place and people.'
};

function CompassHero({ query, setQuery, onPrompt, activeSignals, onOpenExplain }) {
  const [focusMode, setFocusMode] = useState('balanced');
  const activeCopy = activeSignals.length ? insightCopy[activeSignals[activeSignals.length - 1]] : 'Start with a direction, a preference, or a question. Compass will show how each signal changes the discovery path.';
  return (
    <Paper className="aurora-card" elevation={0} sx={{ p: { xs: 2, md: 3.5 }, border: '1px solid', borderColor: 'rgba(255,255,255,0.25)', color: 'white', overflow: 'hidden', background: 'linear-gradient(135deg, #13151B 0%, #1B3A5C 50%, #1B6FE8)', boxShadow: '0 12px 32px rgba(12, 41, 126, 0.12)' }}>
      <Box className="glow-orbit" />
      <Stack position="relative" spacing={2.4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={2}>
          <Stack direction="row" spacing={1.7} alignItems="center">
            <Box className="compass-ring" />
            <Box>
              <Typography variant="overline" sx={{ color: '#B8DFFF' }}>H-bridge Compass</Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>Explore the work beneath the job title.</Typography>
            </Box>
          </Stack>
          <Chip icon={<PsychologyAltRounded />} label="Frontend AI preview" onClick={onOpenExplain} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid', borderColor: 'rgba(255,255,255,0.2)', '& .MuiChip-icon': { color: '#74C0FC' } }} />
        </Stack>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.3fr) minmax(260px, .7fr)' }, gap: 2 }}>
          <Stack spacing={1.25}>
            <TextField value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask Compass about a direction, team, or place" fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded sx={{ color: '#5A9AF5' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'white', borderRadius: 4 }, '& .MuiOutlinedInput-notchedOutline': { border: 0 } }} />
            <Stack direction="row" flexWrap="wrap" gap={0.8}>
              {promptSuggestions.map(prompt => <Chip key={prompt} icon={<AutoAwesomeRounded />} label={prompt} clickable onClick={() => onPrompt(prompt)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid', borderColor: 'rgba(255,255,255,0.17)', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' }, '& .MuiChip-icon': { color: '#63E6BE' } }} />)}
            </Stack>
          </Stack>
          <Paper elevation={0} sx={{ p: 1.7, borderRadius: 4, bgcolor: 'rgba(19, 21, 26, 0.4)', color: 'white', border: '1px solid', borderColor: 'rgba(255,255,255,0.1)' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography fontWeight={800} fontSize="0.86rem">Explore mode</Typography>
              <ToggleButtonGroup exclusive value={focusMode} onChange={(_, v) => v && setFocusMode(v)} size="small" sx={{ '& .MuiToggleButton-root': { color: 'rgba(255,255,255,0.72)', borderColor: 'rgba(255,255,255,0.18)', px: 1, py: 0.25, fontSize: '0.68rem' }, '& .Mui-selected': { color: 'white !important', bgcolor: 'rgba(255,255,255,0.18) !important' } }}>
                <ToggleButton value="balanced">Balanced</ToggleButton><ToggleButton value="focused">Focused</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Typography sx={{ mt: 1.2, color: 'rgba(255,255,255,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>{activeCopy}</Typography>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  );
}

function FilterPanel({ activeSignals, toggleSignal, clearFilters }) {
  return (
    <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'divider', position: 'sticky', top: 92 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><SectionLabel icon={<TuneRounded fontSize="small" />}>Discovery controls</SectionLabel><Button onClick={clearFilters} size="small" color="inherit" sx={{ color: 'text.secondary' }}>Clear</Button></Box>
      <Divider />
      {filterGroups.map((group, gi) => <Accordion key={group.label} disableGutters defaultExpanded={gi === 0} elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: gi === filterGroups.length - 1 ? 0 : '1px solid #E7E9F3' }}>
        <AccordionSummary expandIcon={<KeyboardArrowDownRounded />} sx={{ px: 2, minHeight: 50 }}><Typography fontWeight={800} fontSize="0.87rem">{group.label}</Typography></AccordionSummary>
        <AccordionDetails sx={{ pt: 0, px: 1.2, pb: 1.5 }}>
          <Stack spacing={0.25}>{group.values.map(([id, label]) => <FormControlLabel key={id} sx={{ m: 0, px: 0.75, borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(27,111,232,.05)' } }} control={<Switch size="small" checked={activeSignals.includes(id)} onChange={() => toggleSignal(id)} />} label={<Typography fontSize="0.82rem" color="text.secondary">{label}</Typography>} />)}</Stack>
        </AccordionDetails>
      </Accordion>)}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'rgba(12, 41, 126, 0.03)' }}>
        <Stack direction="row" spacing={0.9} alignItems="flex-start"><VerifiedRounded color="primary" fontSize="small" /><Typography variant="caption" color="text.secondary" lineHeight={1.45}>Signals are always visible and adjustable.</Typography></Stack>
      </Box>
    </Paper>
  );
}

function CompanyCard({ company, saved, onSave, onOpen }) {
  const companyJobs = jobs.filter(j => j.company_id === company.id);
  return (
    <Card className="company-card" sx={{ height: '100%', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box className="company-art" sx={{ minHeight: 158, p: 2.1, color: 'white', background: `linear-gradient(135deg, ${company.tone[0]}, ${company.tone[1]})`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={0.5}>
            {company.featured && <Chip label="Featured" size="small" sx={{ height: 22, color: '#D98F0A', bgcolor: 'rgba(245,158,11,0.12)', border: '1px solid', borderColor: alpha('#D98F0A', 0.4), fontSize: '0.65rem' }} />}
            {company.foreign_student_friendly && <Chip label="留学生歓迎" size="small" sx={{ height: 22, color: 'white', bgcolor: 'rgba(255,255,255,0.16)', border: '1px solid', borderColor: 'rgba(255,255,255,0.26)', fontSize: '0.65rem' }} />}
          </Stack>
          <Tooltip title={saved ? 'Remove from Interested' : 'Save to Interested'}><IconButton onClick={() => onSave(company.id)} sx={{ color: saved ? '#FFFFFF' : 'rgba(255,255,255,0.85)', bgcolor: saved ? 'rgba(30,32,75,0.22)' : 'transparent' }}>{saved ? <BookmarkRounded /> : <BookmarkAddRounded />}</IconButton></Tooltip>
        </Stack>
        <Typography variant="h3" sx={{ maxWidth: '82%', fontSize: '1.35rem', lineHeight: 1.04 }}>{company.headline}</Typography>
      </Box>
      <CardContent sx={{ p: 2.1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1, '&:last-child': { pb: 2.1 } }}>
        <Box><Typography variant="h3" fontSize="1.04rem">{company.name}</Typography><Typography color="text.secondary" fontSize="0.79rem" sx={{ mt: 0.25 }}>{company.industry} · {company.work_locations?.join(', ')}</Typography></Box>
        <Typography color="text.secondary" fontSize="0.84rem" lineHeight={1.52} sx={{ mt: 1, minHeight: 42 }}>{company.summary}</Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
          <Chip label={`JP: ${ENUMS.japanese_level[company.japanese_level_required] || company.japanese_level_required}`} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.65rem' }} />
          {company.regional_work && <Chip label="地方勤務あり" size="small" color="secondary" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
          {company.nationwide_relocation && <Chip label="全国転勤あり" size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
        </Stack>
        <Typography color="text.secondary" fontSize="0.72rem" sx={{ mt: 0.8 }}>{companyJobs.length} open position{companyJobs.length !== 1 ? 's' : ''}</Typography>
        <SignalThread tone={company.tone} />
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Button variant="contained" color="secondary" onClick={() => onOpen(company)} fullWidth endIcon={<ArrowOutwardRounded fontSize="small" />}>Explore</Button>
          <Button variant="outlined" onClick={() => onSave(company.id)} sx={{ minWidth: 43, px: 1 }}>{saved ? <BookmarkRounded /> : <BookmarkAddRounded />}</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function DetailDrawer({ company, saved, onClose, onSave, onRefer, onOpenExplain }) {
  const [tab, setTab] = useState('insight');
  if (!company) return null;
  const companyJobs = jobs.filter(j => j.company_id === company.id);
  return <Drawer anchor="right" open={Boolean(company)} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 480 }, p: { xs: 2, sm: 3 }, bgcolor: '#FAFBFE' } }}>
    <Stack spacing={2.1} sx={{ height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center"><SectionLabel icon={<HubRounded fontSize="small" />}>Company signal</SectionLabel><IconButton onClick={onClose}><CloseRounded /></IconButton></Stack>
      <Paper className="company-art" elevation={0} sx={{ color: 'white', p: 2.5, minHeight: 160, borderRadius: 5, background: `linear-gradient(135deg, ${company.tone[0]}, ${company.tone[1]})`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={0.5}>
          <Chip label={company.industry} size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.16)', border: '1px solid', borderColor: 'rgba(255,255,255,0.28)' }} />
          {company.featured && <Chip label="Featured" size="small" sx={{ color: '#D98F0A', bgcolor: 'rgba(245,158,11,0.12)', border: '1px solid', borderColor: alpha('#D98F0A', 0.4) }} />}
        </Stack>
        <Typography variant="h2" sx={{ maxWidth: '85%' }}>{company.headline}</Typography>
      </Paper>
      <Box><Typography variant="h2" fontSize="1.65rem">{company.name}</Typography><Typography color="text.secondary" sx={{ mt: 0.5 }}>{company.summary}</Typography></Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" sx={{ minHeight: 40, bgcolor: alpha('#1B6FE8', 0.045), borderRadius: 2.5, p: 0.4, '& .MuiTabs-indicator': { display: 'none' }, '& .MuiTab-root': { minHeight: 34, minWidth: 0, borderRadius: 2, py: 0.6, fontSize: '0.73rem' }, '& .Mui-selected': { bgcolor: 'white', boxShadow: '0 2px 8px rgba(38,44,90,.09)' } }}>
        <Tab value="insight" label="Why it surfaced" /><Tab value="jobs" label={`Jobs (${companyJobs.length})`} /><Tab value="culture" label="Working style" />
      </Tabs>
      {tab === 'insight' && <Stack spacing={1.2}><Typography fontWeight={800}>Compass preview insight</Typography><Typography color="text.secondary" fontSize="0.9rem" lineHeight={1.55}>This company surfaced because its signals connect with the direction you are exploring.</Typography><Stack direction="row" flexWrap="wrap" gap={0.8}>{company.signals.map(s => <Chip key={s} icon={<AutoAwesomeRounded />} label={s} variant="outlined" color="primary" />)}</Stack><Stack direction="row" flexWrap="wrap" gap={0.5}><Chip label={`JP: ${ENUMS.japanese_level[company.japanese_level_required]}`} size="small" color="primary" />{company.foreign_student_friendly && <Chip label="留学生歓迎" size="small" color="success" />}{company.regional_work && <Chip label="地方勤務あり" size="small" color="secondary" />}{company.nationwide_relocation && <Chip label="全国転勤あり" size="small" />}</Stack></Stack>}
      {tab === 'jobs' && <List disablePadding>{companyJobs.map((job, i) => <ListItem key={job.id} disableGutters divider={i < companyJobs.length - 1} sx={{ flexDirection: 'column', alignItems: 'stretch', py: 1.2 }}>
        <Stack direction="row" justifyContent="space-between"><Typography fontWeight={750}>{job.title}</Typography><Chip label={job.employment_type} size="small" variant="outlined" /></Stack>
        <Stack direction="row" flexWrap="wrap" gap={0.4} sx={{ mt: 0.5 }}>
          <Chip label={job.location} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.65rem' }} />
          <Chip label={`JP: ${ENUMS.japanese_level[job.japanese_level_required]}`} size="small" sx={{ fontSize: '0.65rem' }} />
          <Chip label={`EN: ${ENUMS.english_level[job.english_level_required]}`} size="small" sx={{ fontSize: '0.65rem' }} />
          {job.housing_support && <Chip label="住宅支援" size="small" color="success" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
          {job.regional_placement && <Chip label="地方配属" size="small" color="secondary" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
          {job.nationwide_transfer && <Chip label="全国転勤" size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
        </Stack>
        <Typography color="text.secondary" fontSize="0.75rem" sx={{ mt: 0.4 }}>Start: {ENUMS.start_timing[job.start_timing] || job.start_timing}</Typography>
      </ListItem>)}</List>}
      {tab === 'culture' && <Stack spacing={1.1}><Typography fontWeight={800}>Working style cues</Typography><Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2.5 }}><Stack direction="row" spacing={1.1}><Diversity3Rounded color="secondary" /><Box><Typography fontWeight={800} fontSize="0.86rem">Human review stays in the loop</Typography><Typography color="text.secondary" fontSize="0.79rem">Use this as a conversation starter, then let H-bridge confirm details.</Typography></Box></Stack></Paper><Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2.5 }}><Stack direction="row" spacing={1.1}><RouteRounded color="primary" /><Box><Typography fontWeight={800} fontSize="0.86rem">{company.flexible}</Typography><Typography color="text.secondary" fontSize="0.79rem">Treat location and support as things to discuss, not assumptions.</Typography></Box></Stack></Paper></Stack>}
      <Box sx={{ mt: 'auto', pt: 1 }}><Divider sx={{ mb: 1.8 }} /><Stack direction="row" spacing={1}><Button variant={saved ? 'outlined' : 'contained'} onClick={() => onSave(company.id)} startIcon={saved ? <BookmarkRounded /> : <BookmarkAddRounded />} fullWidth>{saved ? 'Interested' : 'Save for later'}</Button><Button variant="contained" color="secondary" onClick={() => onRefer(company)} fullWidth>Request Referral</Button></Stack></Box>
    </Stack>
  </Drawer>;
}

export default function DiscoverPage({ query, setQuery, activeSignals, toggleSignal, clearFilters, saved, onSave, onOpen, onOpenExplain }) {
  const list = useMemo(() => companies.filter(c => {
    const text = `${c.name} ${c.industry} ${c.summary} ${c.roles.join(' ')} ${c.traits.join(' ')}`.toLowerCase();
    const qm = !query || text.includes(query.toLowerCase());
    const fm = !activeSignals.length || activeSignals.every(s => c.traits.includes(s));
    return qm && fm;
  }), [activeSignals, query]);

  const onPrompt = prompt => {
    setQuery(prompt);
    if (prompt.includes('regional')) toggleSignal('regional');
    if (prompt.includes('hands')) toggleSignal('making');
    if (prompt.includes('international')) toggleSignal('language');
    if (prompt.includes('creative')) toggleSignal('creative');
  };

  return <Box component="main" sx={{ maxWidth: 1500, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2, md: 3.5 }, pb: { xs: 10 } }}>
    <CompassHero query={query} setQuery={setQuery} onPrompt={onPrompt} activeSignals={activeSignals} onOpenExplain={onOpenExplain} />
    <Alert icon={<PsychologyAltRounded />} severity="info" variant="outlined" sx={{ mt: 2, borderRadius: 4, bgcolor: 'rgba(12,41,126,0.03)', borderColor: 'rgba(12,41,126,0.1)', alignItems: 'center', '& .MuiAlert-message': { fontSize: '0.81rem' } }}>Compass is a frontend preview — not a live AI model.</Alert>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '250px minmax(0, 1fr)' }, alignItems: 'start', gap: 2.5, mt: 2.5 }}>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}><FilterPanel activeSignals={activeSignals} toggleSignal={toggleSignal} clearFilters={clearFilters} /></Box>
      <Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'flex-end' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2.1 }}>
          <Box><SectionLabel icon={<HubRounded fontSize="small" />}>Companies</SectionLabel><Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.4 }}>Find teams that make sense for you.</Typography></Box>
          <Chip icon={<InsightsRounded />} label={activeSignals.length ? 'Signals are shaping this view' : 'Start shaping your view'} color="primary" variant="outlined" sx={{ bgcolor: 'rgba(12, 41, 126, 0.03)' }} />
        </Stack>
        {list.length ? <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' }, gap: 2.1 }}>{list.map(c => <CompanyCard key={c.id} company={c} saved={saved.includes(c.id)} onSave={onSave} onOpen={onOpen} />)}</Box> : <Paper variant="outlined" sx={{ borderStyle: 'dashed', py: 7, px: 3, textAlign: 'center', borderRadius: 5 }}><AutoAwesomeRounded color="primary" /><Typography variant="h3" sx={{ mt: 1 }}>No match</Typography><Button onClick={clearFilters} variant="contained" sx={{ mt: 2 }}>Reset discovery</Button></Paper>}
      </Box>
    </Box>
  </Box>;
}

export function RolesPage({ onOpen }) {
  const allJobs = jobs.map(job => ({ job, company: companies.find(c => c.id === job.company_id) })).filter(x => x.company);
  return <Box component="main" sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
    <SectionLabel icon={<BusinessCenterRounded fontSize="small" />}>Job explorer</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.6 }}>Look past the title.</Typography>
    <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 630 }}>Browse all open positions across companies. Each job shows language requirements, location, and support details.</Typography>
    <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
      {allJobs.map(({ job, company }) => <Card key={job.id} sx={{ borderRadius: 5 }}><CardContent>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between"><Avatar sx={{ bgcolor: alpha(company.tone[0], 0.12), color: company.tone[0] }}><WorkspacesRounded /></Avatar><Chip label={job.employment_type} size="small" /></Stack>
        <Typography variant="h3" sx={{ mt: 2 }}>{job.title}</Typography>
        <Typography fontWeight={750} fontSize="0.86rem" sx={{ mt: 0.5 }}>{company.name}</Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.4} sx={{ mt: 1 }}>
          <Chip label={job.location} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.65rem' }} />
          <Chip label={`JP: ${ENUMS.japanese_level[job.japanese_level_required]}`} size="small" sx={{ fontSize: '0.65rem' }} />
          {job.housing_support && <Chip label="住宅支援" size="small" color="success" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
          {job.regional_placement && <Chip label="地方配属" size="small" color="secondary" variant="outlined" sx={{ fontSize: '0.65rem' }} />}
        </Stack>
        <Button onClick={() => onOpen(company)} endIcon={<ArrowOutwardRounded />} sx={{ mt: 1.4, px: 0 }}>Open company</Button>
      </CardContent></Card>)}
    </Box>
  </Box>;
}
