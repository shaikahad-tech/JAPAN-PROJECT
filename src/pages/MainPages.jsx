import { useState } from 'react';
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Divider, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountTreeRounded, ApartmentRounded, ArrowOutwardRounded, AutoAwesomeRounded, CalendarMonthRounded, CheckCircleRounded, Diversity3Rounded, ExploreRounded, InsightsRounded, PsychologyAltRounded, RouteRounded, TimelineRounded, VerifiedRounded } from '@mui/icons-material';
import { SectionLabel } from '../components/shared';
import { companies, events as eventPrograms, mockActivities, mockSelectionFeedback, ENUMS } from '../data';

// ─── Dashboard ───────────────────────────────────────────────────────────────
export function DashboardPage({ profile, careerCheck, savedCompanies, referrals, applications, joinedEvents, setPage, onOpen }) {
  const profileScore = profile?.profile_completion_score || 0;
  const careerScore = careerCheck?.total_score || null;
  const appCounts = {
    interested: savedCompanies.length,
    applied: applications.filter(a => ['applied','document_screening','interview_scheduled','interview_completed','waiting_result'].includes(a.student_tracking_status)).length,
    offer: applications.filter(a => a.student_tracking_status === 'offer_received').length,
    total: applications.length
  };

  const nextActions = [
    { label: profileScore >= 80 ? 'Keep your profile current' : 'Complete your profile', copy: `Profile is ${profileScore}% complete.`, action: 'profile', icon: <AccountTreeRounded /> },
    { label: careerScore ? `Career Readiness: ${careerScore}/100` : 'Take Career Check', copy: careerScore ? 'Use your score to guide company discovery.' : 'A rule-based reflection that gives you a readiness score.', action: 'career-check', icon: <PsychologyAltRounded /> },
    { label: 'Browse companies & jobs', copy: 'Explore companies, roles, events, or start a referral path.', action: 'discover', icon: <ExploreRounded /> }
  ];

  return <Box component="main" sx={{ maxWidth: 1260, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.25fr) minmax(300px, .75fr)' }, gap: 2.2 }}>
      {/* Hero */}
      <Paper className="aurora-card" elevation={0} sx={{ p: { xs: 2.2, md: 3.2 }, minHeight: { md: 280 }, color: 'white', overflow: 'hidden', background: 'linear-gradient(135deg, #13151B 0%, #1B3A5C 55%, #1B6FE8)', borderRadius: 6 }}>
        <Box className="glow-orbit" />
        <Box position="relative">
          <SectionLabel icon={<AutoAwesomeRounded />} sx={{ '& .MuiTypography-root': { color: '#B8DFFF' } }}>H-bridge Career</SectionLabel>
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 1 }}>Your job-hunting workspace.</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.72)', mt: 1, maxWidth: 560 }}>Preparation, company discovery, referral conversations, and feedback — all in one workspace.</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
            <Button color="secondary" variant="contained" onClick={() => setPage('discover')}>Open Compass</Button>
            <Button variant="outlined" onClick={() => setPage('career-check')} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.22)', '&:hover': { borderColor: 'white', bgcolor: alpha('#FFFFFF', 0.08) } }}>Career Check</Button>
          </Stack>
        </Box>
      </Paper>

      {/* Right: Scores & Summary */}
      <Stack spacing={2}>
        {/* Career Readiness Score */}
        <Paper variant="outlined" sx={{ p: 2.2, borderRadius: 5 }}>
          <SectionLabel icon={<InsightsRounded fontSize="small" />}>Career readiness</SectionLabel>
          {careerScore ? <>
            <Typography variant="h2" sx={{ mt: 0.8, fontSize: '2.8rem', color: 'primary.main' }}>{careerScore}<Typography component="span" color="text.secondary" fontSize="1rem">/100</Typography></Typography>
            <LinearProgress variant="determinate" value={careerScore} sx={{ mt: 1, height: 8, borderRadius: 8, bgcolor: 'rgba(12, 41, 126, 0.06)', '& .MuiLinearProgress-bar': { borderRadius: 8, background: 'linear-gradient(90deg, #10B981, #1B6FE8)' } }} />
          </> : <><Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 0.5 }}>Take your Career Check to see your readiness score.</Typography><Button onClick={() => setPage('career-check')} variant="contained" size="small" sx={{ mt: 1 }}>Start Career Check</Button></>}
        </Paper>
        {/* Profile Completion */}
        <Paper variant="outlined" sx={{ p: 2.2, borderRadius: 5 }}>
          <SectionLabel icon={<AccountTreeRounded fontSize="small" />}>Profile completion</SectionLabel>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 1 }}>
            <Box sx={{ position: 'relative', width: 52, height: 52, borderRadius: '50%', background: `conic-gradient(#10B981 0 ${profileScore}%, rgba(12,41,126,0.06) ${profileScore}%)`, '&:after': { content: '""', position: 'absolute', inset: 7, borderRadius: '50%', bgcolor: 'white' } }} />
            <Box><Typography fontWeight={800} fontSize="1.1rem">{profileScore}%</Typography><Typography color="text.secondary" fontSize="0.76rem">{profileScore >= 80 ? 'Profile is ready.' : 'Complete missing fields.'}</Typography></Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>

    {/* Application Summary */}
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 1.5, mt: 2.2 }}>
      {[['Interested', appCounts.interested, 'secondary'], ['In progress', appCounts.applied, 'primary'], ['Offers', appCounts.offer, 'success'], ['Total apps', appCounts.total, 'default']].map(([label, count, color]) => (
        <Paper key={label} variant="outlined" sx={{ p: 1.5, borderRadius: 5, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: '1.8rem', color: color === 'default' ? 'text.primary' : `${color}.main` }}>{count}</Typography>
          <Typography color="text.secondary" fontSize="0.78rem">{label}</Typography>
        </Paper>
      ))}
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.1fr) minmax(300px, .9fr)' }, gap: 2.2, mt: 2.2 }}>
      {/* Next Actions */}
      <Paper variant="outlined" sx={{ p: 2.4, borderRadius: 6 }}>
        <SectionLabel icon={<RouteRounded fontSize="small" />}>Recommended next steps</SectionLabel>
        <Stack divider={<Divider flexItem />} sx={{ mt: 1 }}>{nextActions.map(item => <Stack key={item.label} direction="row" alignItems="center" spacing={1.4} sx={{ py: 1.35 }}><Avatar sx={{ bgcolor: 'rgba(12, 41, 126, 0.06)', color: 'primary.main' }}>{item.icon}</Avatar><Box flexGrow={1}><Typography fontWeight={800} fontSize="0.91rem">{item.label}</Typography><Typography color="text.secondary" fontSize="0.78rem" sx={{ mt: 0.25 }}>{item.copy}</Typography></Box><Button onClick={() => setPage(item.action)} size="small" endIcon={<ArrowOutwardRounded fontSize="small" />}>Open</Button></Stack>)}</Stack>
      </Paper>

      {/* Upcoming Events */}
      <Paper variant="outlined" sx={{ p: 2.4, borderRadius: 6 }}>
        <SectionLabel icon={<CalendarMonthRounded fontSize="small" />}>Upcoming events</SectionLabel>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {eventPrograms.filter(e => joinedEvents.includes(e.id) || true).slice(0, 3).map(event => {
            const joined = joinedEvents.includes(event.id);
            return <Paper key={event.id} variant="outlined" sx={{ p: 1.35, borderRadius: 5, bgcolor: joined ? 'rgba(16, 185, 129, 0.04)' : undefined }}>
              <Typography fontWeight={800} fontSize="0.84rem">{event.title}</Typography>
              <Typography color="text.secondary" fontSize="0.72rem">{event.kind} · {new Date(event.date).toLocaleDateString()}</Typography>
              {joined && <Chip label="参加予定" size="small" color="success" variant="outlined" sx={{ mt: 0.5, fontSize: '0.65rem' }} />}
            </Paper>;
          })}
          <Button onClick={() => setPage('events')} variant="outlined" size="small">View all events</Button>
        </Stack>
      </Paper>
    </Box>

    {/* Recommended & Featured Companies */}
    <Paper variant="outlined" sx={{ mt: 2.2, p: 2.4, borderRadius: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}><Box><SectionLabel icon={<AutoAwesomeRounded fontSize="small" />}>Recommended companies</SectionLabel><Typography variant="h3" sx={{ mt: 0.5 }}>Based on your profile</Typography></Box><Button onClick={() => setPage('discover')}>See all</Button></Stack>
      <Box sx={{ mt: 1.8, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.2 }}>
        {companies.filter(c => !c.featured).slice(0, 3).map(c => <Paper key={c.id} variant="outlined" onClick={() => onOpen(c)} sx={{ p: 1.3, borderRadius: 5, cursor: 'pointer', transition: '150ms ease', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' } }}><Stack direction="row" spacing={1} alignItems="center"><Avatar sx={{ background: `linear-gradient(135deg, ${c.tone[0]}, ${c.tone[1]})` }}><ApartmentRounded fontSize="small" /></Avatar><Box><Typography fontWeight={800} fontSize="0.82rem">{c.name}</Typography><Typography color="text.secondary" fontSize="0.7rem">{c.path}</Typography></Box></Stack></Paper>)}
      </Box>
    </Paper>
    <Paper variant="outlined" sx={{ mt: 1.5, p: 2.4, borderRadius: 6 }}>
      <SectionLabel icon={<VerifiedRounded fontSize="small" />}>Featured companies</SectionLabel>
      <Typography color="text.secondary" fontSize="0.78rem" sx={{ mt: 0.3 }}>Sponsored / featured — separate from AI recommendations.</Typography>
      <Box sx={{ mt: 1.5, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.2 }}>
        {companies.filter(c => c.featured).map(c => <Paper key={c.id} variant="outlined" onClick={() => onOpen(c)} sx={{ p: 1.5, borderRadius: 5, cursor: 'pointer', bgcolor: alpha('#FFD700', 0.02), border: '1px solid', borderColor: 'rgba(245,158,11,0.14)', '&:hover': { borderColor: '#FFD700' } }}><Stack direction="row" spacing={1} alignItems="center"><Avatar sx={{ background: `linear-gradient(135deg, ${c.tone[0]}, ${c.tone[1]})` }}><ApartmentRounded fontSize="small" /></Avatar><Box><Typography fontWeight={800} fontSize="0.85rem">{c.name} <Chip label="Featured" size="small" sx={{ fontSize: '0.6rem', height: 18, ml: 0.5, color: '#B8860B', bgcolor: alpha('#FFD700', 0.15) }} /></Typography><Typography color="text.secondary" fontSize="0.72rem">{c.industry} · {c.place}</Typography></Box></Stack></Paper>)}
      </Box>
    </Paper>

    {/* Recent Activity */}
    <Paper variant="outlined" sx={{ mt: 2.2, p: 2.4, borderRadius: 6 }}>
      <SectionLabel icon={<TimelineRounded fontSize="small" />}>Recent activity</SectionLabel>
      <List disablePadding sx={{ mt: 0.5 }}>{mockActivities.slice(0, 5).map((act, i) => <ListItem key={act.id} disableGutters divider={i < 4}><ListItemText primary={act.description} secondary={new Date(act.timestamp).toLocaleDateString()} primaryTypographyProps={{ fontSize: '0.85rem' }} secondaryTypographyProps={{ fontSize: '0.72rem' }} /></ListItem>)}</List>
    </Paper>

    {/* Ask / Report */}
    <Paper variant="outlined" sx={{ mt: 2.2, p: 2, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box><SectionLabel icon={<Diversity3Rounded fontSize="small" />}>Ask / Report to H-bridge</SectionLabel><Typography color="text.secondary" fontSize="0.82rem">Referral and selection-related contact only.</Typography></Box>
      <Button onClick={() => setPage('support')} variant="outlined">Contact</Button>
    </Paper>
  </Box>;
}

// ─── Events Page ─────────────────────────────────────────────────────────────
export function EventsPage({ joinedEvents, onJoin, onCreateReferral, setPage }) {
  return <Box component="main" sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
    <SectionLabel icon={<CalendarMonthRounded fontSize="small" />}>Scalable career support</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.6 }}>Learn, meet, and move forward together.</Typography>
    <Typography color="text.secondary" sx={{ maxWidth: 660, mt: 1 }}>H-bridge delivers resume, interview, and career support through events in the MVP.</Typography>
    <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
      {eventPrograms.map(event => {
        const joined = joinedEvents.includes(event.id);
        return <Card key={event.id} sx={{ borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2.2, minHeight: 145, color: 'white', background: `linear-gradient(135deg, ${event.theme[0]}, ${event.theme[1]})`, position: 'relative', overflow: 'hidden' }} className="company-art">
            <Stack direction="row" spacing={0.5}>
              <Chip label={event.kind} size="small" sx={{ color: 'white', bgcolor: alpha('#FFFFFF', 0.15), border: '1px solid', borderColor: alpha('#FFFFFF', 0.24) }} />
              <Chip label={ENUMS.event_type[event.event_type]} size="small" sx={{ color: 'white', bgcolor: alpha('#FFFFFF', 0.1), fontSize: '0.65rem' }} />
            </Stack>
            <Typography variant="h3" sx={{ mt: 3 }}>{event.title}</Typography>
          </Box>
          <CardContent sx={{ p: 2.1, display: 'flex', flexDirection: 'column', flexGrow: 1, '&:last-child': { pb: 2.1 } }}>
            <Typography color="text.secondary" fontSize="0.84rem" lineHeight={1.55}>{event.detail}</Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
              <Chip label={new Date(event.date).toLocaleDateString()} size="small" variant="outlined" icon={<CalendarMonthRounded />} />
              <Chip label={`${event.participants_count}/${event.capacity}`} size="small" variant="outlined" />
            </Stack>
            <Chip label={event.mode} size="small" variant="outlined" sx={{ alignSelf: 'flex-start', mt: 1 }} />
            <Box sx={{ mt: 'auto', pt: 1.8 }}>
              <Button fullWidth variant={joined ? 'outlined' : 'contained'} color={joined ? 'primary' : 'secondary'} onClick={() => onJoin(event.id)}>{joined ? 'Joined ✓' : 'Join this event'}</Button>
              {joined && event.event_type === 'company_info_session' && <Button fullWidth sx={{ mt: 0.8 }} onClick={() => onCreateReferral(companies.find(c => c.id === event.company_id) || companies[1])}>Request referral support</Button>}
            </Box>
          </CardContent>
        </Card>;
      })}
    </Box>
  </Box>;
}

// ─── Feedback Page ───────────────────────────────────────────────────────────
export function FeedbackPage({ setPage }) {
  const sharedFeedback = mockSelectionFeedback.filter(f => f.share_with_student);
  return <Box component="main" sx={{ maxWidth: 950, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
    <SectionLabel icon={<VerifiedRounded fontSize="small" />}>Selection feedback</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.6 }}>Feedback you can use, shared when it is ready.</Typography>
    <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 670 }}>Student-facing feedback is only shown after H-bridge intentionally shares it. Internal notes and raw company feedback never appear here.</Typography>
    {sharedFeedback.length ? <Stack spacing={1.5} sx={{ mt: 3 }}>{sharedFeedback.map(f => <Paper key={f.id} variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 6, bgcolor: alpha('#12B886', 0.02) }}>
      <Stack direction="row" spacing={0.6}><Chip label={ENUMS.feedback_stage[f.stage]} size="small" /><Chip label={ENUMS.selection_result[f.result]} size="small" color={f.result === 'pass' ? 'success' : 'warning'} /></Stack>
      <Typography sx={{ mt: 1.5, lineHeight: 1.6 }}>{f.student_facing_feedback}</Typography>
      {f.next_action && <Paper variant="outlined" sx={{ mt: 1.5, p: 1.5, borderRadius: 5, bgcolor: alpha('#1B6FE8', 0.03) }}><Typography fontWeight={750} fontSize="0.85rem">Next action</Typography><Typography fontSize="0.88rem" sx={{ mt: 0.3 }}>{f.next_action}</Typography></Paper>}
    </Paper>)}</Stack> : <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2, md: 3 }, borderRadius: 6 }}><Stack direction="row" spacing={1.2} alignItems="center"><Avatar sx={{ bgcolor: alpha('#139B7A', 0.1), color: 'success.main' }}><CheckCircleRounded /></Avatar><Box><Typography fontWeight={800}>No published feedback yet.</Typography><Typography color="text.secondary" fontSize="0.84rem">Feedback will appear here after H-bridge shares it.</Typography></Box></Stack></Paper>}
    <Button onClick={() => setPage('support')} variant="contained" sx={{ mt: 2 }}>Ask a selection-related question</Button>
  </Box>;
}

// ─── Support Page ────────────────────────────────────────────────────────────
export function SupportPage({ onSend, setPage }) {
  const [type, setType] = useState('referral_related_question');
  const [message, setMessage] = useState('');
  return <Box component="main" sx={{ maxWidth: 920, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
    <SectionLabel icon={<Diversity3Rounded fontSize="small" />}>Ask or report to H-bridge</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.6 }}>Referral and selection-related contact.</Typography>
    <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 650 }}>Use this for referral and selection updates. General resume and interview support belongs in H-bridge events.</Typography>
    <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
      <Stack spacing={2}>
        <TextField select label="What is this about?" value={type} onChange={e => setType(e.target.value)}>
          {Object.entries(ENUMS.support_request_type).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
        </TextField>
        <TextField multiline minRows={5} label="What would you like H-bridge to know?" value={message} onChange={e => setMessage(e.target.value)} placeholder="Share the details that will help us understand your situation." />
        <Alert severity="info" variant="outlined">This is a frontend preview. Sending creates a local workspace update only.</Alert>
        <Stack direction="row" justifyContent="flex-end" spacing={1}><Button onClick={() => setPage('journey')}>Cancel</Button><Button variant="contained" disabled={!message.trim()} onClick={() => { onSend({ type, message }); setPage('journey'); }}>Send to H-bridge</Button></Stack>
      </Stack>
    </Paper>
  </Box>;
}

// ─── Access / Login Page ─────────────────────────────────────────────────────
export function AccessPage({ setPage }) {
  return <Box component="main" sx={{ maxWidth: 560, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 4, md: 7 } }}>
    <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: '0 20px 45px rgba(37,43,78,.08)' }}>
      <Typography variant="h2" sx={{ mt: 1 }}>Enter H-bridge Career</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>Authentication will be connected with Supabase Auth. Choose a frontend view for now.</Typography>
      <Stack spacing={1.2} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => setPage('dashboard')}>Continue as Student</Button>
        <Button variant="outlined" onClick={() => setPage('admin')}>Open Admin View</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" color="text.secondary">No account or data is created in this frontend preview.</Typography>
    </Paper>
  </Box>;
}
