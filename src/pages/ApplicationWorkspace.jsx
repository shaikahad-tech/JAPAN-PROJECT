import { useState } from 'react';
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ApartmentRounded, ArrowOutwardRounded, AutoAwesomeRounded, BookmarkAddRounded, BookmarkRounded, BusinessCenterRounded, CalendarMonthRounded, CheckCircleRounded, CloseRounded, Diversity3Rounded, EditRounded, VerifiedRounded } from '@mui/icons-material';
import { SectionLabel } from '../components/shared';
import { companies, ENUMS, mockSelectionFeedback } from '../data';

export default function ApplicationWorkspace({ savedCompanies, referrals, applications, setApplications, onOpen, onRefer, setPage }) {
  const [wsTab, setWsTab] = useState('active');
  const [detailApp, setDetailApp] = useState(null);
  const [detailTab, setDetailTab] = useState('overview');

  const activeApps = applications.filter(a => a.application_mode !== 'closed');
  const hbridgeApps = applications.filter(a => a.application_mode === 'hbridge_review' || a.application_mode === 'hbridge_referral');
  const displayApps = wsTab === 'active' ? activeApps : wsTab === 'hbridge' ? hbridgeApps : applications;

  const getCompanyName = (app) => {
    if (app.external_company_name) return app.external_company_name;
    const c = companies.find(co => co.id === app.company_id);
    return c?.name || 'Unknown';
  };
  const getCompany = (app) => companies.find(co => co.id === app.company_id);

  const updateTrackingStatus = (appId, status) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, student_tracking_status: status } : a));
  };

  // Add self-tracking application
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newApp, setNewApp] = useState({ external_company_name: '', external_job_title: '' });
  const handleAddSelfApp = () => {
    const app = {
      id: `app-self-${Date.now()}`, student_id: 'sp-001', company_id: null, job_id: null,
      external_company_name: newApp.external_company_name, external_job_title: newApp.external_job_title,
      application_source: 'self', application_mode: 'self_tracking',
      student_tracking_status: 'planning_to_apply', official_hbridge_status: null,
      referral_requested_at: null, next_action_date: null,
      student_note: '', es_questions: [], interview_memos: [],
      created_at: new Date().toISOString()
    };
    setApplications(prev => [...prev, app]);
    setAddDialogOpen(false);
    setNewApp({ external_company_name: '', external_job_title: '' });
  };

  const studentFeedback = mockSelectionFeedback.filter(f => f.share_with_student);

  return (
    <Box component="main" sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
      {/* Hero */}
      <Paper className="aurora-card" elevation={0} sx={{ p: { xs: 2.2, md: 3.2 }, color: 'white', overflow: 'hidden', background: 'linear-gradient(135deg, #13151B, #1B3A5C 55%, #1B6FE8)', borderRadius: 6 }}>
        <Box className="glow-orbit" />
        <Box position="relative">
          <SectionLabel icon={<AutoAwesomeRounded />} sx={{ '& .MuiTypography-root': { color: '#B8DFFF' } }}>Application workspace</SectionLabel>
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, mt: 1 }}>Manage your applications and referrals.</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.72)', mt: 1, maxWidth: 500 }}>Interested companies stay separate. Only active applications, referral requests, and H-bridge referrals appear here.</Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.25fr) minmax(300px, .75fr)' }, gap: 2.2, mt: 2.2 }}>
        {/* Main: Applications */}
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Tabs value={wsTab} onChange={(_, v) => setWsTab(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5, fontSize: '0.8rem' } }}>
              <Tab value="active" label={`Active (${activeApps.length})`} /><Tab value="hbridge" label={`H-bridge (${hbridgeApps.length})`} /><Tab value="all" label={`All (${applications.length})`} />
            </Tabs>
            <Button variant="contained" size="small" onClick={() => setAddDialogOpen(true)}>+ Add application</Button>
          </Stack>

          {displayApps.length ? <Stack spacing={1.2}>
            {displayApps.map(app => {
              const co = getCompany(app);
              return (
                <Paper key={app.id} variant="outlined" sx={{ p: 2, borderRadius: 5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Avatar sx={{ background: co ? `linear-gradient(135deg, ${co.tone[0]}, ${co.tone[1]})` : 'rgba(12, 41, 126, 0.08)', color: co ? 'white' : 'primary.main' }}><BusinessCenterRounded fontSize="small" /></Avatar>
                      <Box>
                        <Typography fontWeight={800}>{getCompanyName(app)}</Typography>
                        <Typography color="text.secondary" fontSize="0.76rem">{app.external_job_title || co?.path || ''}</Typography>
                      </Box>
                    </Stack>
                    <Chip label={ENUMS.application_mode[app.application_mode]} size="small" color={app.application_mode === 'hbridge_referral' ? 'secondary' : app.application_mode === 'hbridge_review' ? 'primary' : 'default'} variant="outlined" />
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mt: 1.2 }}>
                    <TextField select size="small" label="My status" value={app.student_tracking_status} onChange={e => updateTrackingStatus(app.id, e.target.value)} sx={{ minWidth: 160 }}>
                      {Object.entries(ENUMS.student_tracking_status).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
                    </TextField>
                    {app.official_hbridge_status && <Chip label={`H-bridge: ${ENUMS.official_hbridge_status[app.official_hbridge_status]}`} size="small" color="primary" sx={{ alignSelf: 'center' }} />}
                    {app.next_action_date && <Chip icon={<CalendarMonthRounded />} label={app.next_action_date} size="small" variant="outlined" sx={{ alignSelf: 'center' }} />}
                  </Stack>
                  <Button size="small" onClick={() => { setDetailApp(app); setDetailTab('overview'); }} endIcon={<ArrowOutwardRounded />} sx={{ mt: 1, px: 0 }}>View detail</Button>
                </Paper>
              );
            })}
          </Stack> : <Paper variant="outlined" sx={{ py: 5, px: 3, textAlign: 'center', borderRadius: 5, borderStyle: 'dashed' }}><BusinessCenterRounded color="primary" /><Typography fontWeight={800} sx={{ mt: 1 }}>No applications yet</Typography><Typography color="text.secondary" fontSize="0.84rem" sx={{ mt: 0.5 }}>Add a self-tracking application or request a referral from Compass.</Typography></Paper>}
        </Box>

        {/* Sidebar */}
        <Stack spacing={2}>
          {/* Interested (NOT applications) */}
          <Paper variant="outlined" sx={{ p: 2.4, borderRadius: 6 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between"><SectionLabel icon={<BookmarkRounded fontSize="small" />}>Interested</SectionLabel><Button onClick={() => setPage('discover')} size="small">Discover more</Button></Stack>
            <Typography color="text.secondary" fontSize="0.76rem" sx={{ mt: 0.3 }}>Interested companies are bookmarks — not applications.</Typography>
            <Divider sx={{ my: 1.2 }} />
            {savedCompanies.length ? <List disablePadding>{savedCompanies.map((c, i) => <ListItem key={c.id} disableGutters divider={i < savedCompanies.length - 1} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ListItemAvatar><Avatar sx={{ background: `linear-gradient(135deg, ${c.tone[0]}, ${c.tone[1]})` }}><ApartmentRounded fontSize="small" /></Avatar></ListItemAvatar>
                <ListItemText primary={c.name} secondary={`${c.path} · ${c.place}`} primaryTypographyProps={{ fontWeight: 800 }} secondaryTypographyProps={{ fontSize: '0.78rem' }} />
                <IconButton size="small" onClick={() => onOpen(c)}><ArrowOutwardRounded fontSize="small" /></IconButton>
              </Stack>
              <Button size="small" variant="outlined" color="secondary" onClick={() => onRefer(c)} sx={{ mt: 0.5, fontSize: '0.72rem' }}>Request Referral Support</Button>
            </ListItem>)}</List> : <Box sx={{ py: 3, textAlign: 'center' }}><BookmarkAddRounded color="primary" /><Typography fontWeight={800} fontSize="0.85rem" sx={{ mt: 1 }}>No interested companies</Typography></Box>}
          </Paper>

          {/* Referral Conversations */}
          <Paper variant="outlined" sx={{ p: 2.4, borderRadius: 6 }}>
            <SectionLabel icon={<Diversity3Rounded fontSize="small" />}>Referral conversations</SectionLabel>
            <Divider sx={{ my: 1.2 }} />
            {referrals.length ? <Stack spacing={1}>{referrals.map(c => <Paper key={c.id} variant="outlined" sx={{ p: 1.2, borderRadius: 4, bgcolor: 'rgba(16, 185, 129, 0.04)' }}><Stack direction="row" alignItems="center" spacing={1}><CheckCircleRounded color="secondary" fontSize="small" /><Box><Typography fontWeight={800} fontSize="0.83rem">{c.name}</Typography><Typography color="text.secondary" fontSize="0.73rem">H-bridge review requested</Typography></Box></Stack></Paper>)}</Stack> : <Typography color="text.secondary" fontSize="0.85rem">No referral conversations yet.</Typography>}
          </Paper>

          {/* Quick actions */}
          <Stack direction="row" spacing={1}>
            <Button onClick={() => setPage('support')} variant="outlined" fullWidth>Ask / Report</Button>
            <Button onClick={() => setPage('feedback')} variant="contained" fullWidth>View feedback</Button>
          </Stack>
        </Stack>
      </Box>

      {/* Add Self Application Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add self-tracking application</DialogTitle>
        <DialogContent><Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Company name" value={newApp.external_company_name} onChange={e => setNewApp(p => ({ ...p, external_company_name: e.target.value }))} fullWidth />
          <TextField label="Job title" value={newApp.external_job_title} onChange={e => setNewApp(p => ({ ...p, external_job_title: e.target.value }))} fullWidth />
        </Stack></DialogContent>
        <DialogActions><Button onClick={() => setAddDialogOpen(false)}>Cancel</Button><Button variant="contained" disabled={!newApp.external_company_name.trim()} onClick={handleAddSelfApp}>Add application</Button></DialogActions>
      </Dialog>

      {/* Application Detail Drawer */}
      <Drawer anchor="right" open={Boolean(detailApp)} onClose={() => setDetailApp(null)} PaperProps={{ sx: { width: { xs: '100%', sm: 540 }, p: { xs: 2, sm: 3 }, bgcolor: '#FAFBFE' } }}>
        {detailApp && <ApplicationDetail app={detailApp} tab={detailTab} setTab={setDetailTab} onClose={() => setDetailApp(null)} studentFeedback={studentFeedback} />}
      </Drawer>
    </Box>
  );
}

function ApplicationDetail({ app, tab, setTab, onClose, studentFeedback }) {
  const co = companies.find(c => c.id === app.company_id);
  const appFeedback = studentFeedback.filter(f => f.application_id === app.id);
  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center"><SectionLabel icon={<BusinessCenterRounded fontSize="small" />}>Application detail</SectionLabel><IconButton onClick={onClose}><CloseRounded /></IconButton></Stack>
      <Box>
        <Typography variant="h2" fontSize="1.5rem">{app.external_company_name || co?.name}</Typography>
        <Typography color="text.secondary">{app.external_job_title || co?.path || ''}</Typography>
        <Stack direction="row" gap={0.6} sx={{ mt: 0.8 }}>
          <Chip label={ENUMS.application_mode[app.application_mode]} size="small" color="primary" variant="outlined" />
          <Chip label={ENUMS.application_source[app.application_source]} size="small" variant="outlined" />
        </Stack>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5, fontSize: '0.72rem' } }}>
        <Tab value="overview" label="Overview" /><Tab value="es" label="ES / Questions" /><Tab value="memo" label="Interview Memo" /><Tab value="feedback" label="Feedback" /><Tab value="advice" label="H-bridge Advice" />
      </Tabs>
      <Divider />

      {tab === 'overview' && <Stack spacing={1.5}>
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography fontWeight={800} fontSize="0.85rem">Student tracking status</Typography><Chip label={ENUMS.student_tracking_status[app.student_tracking_status]} size="small" color="primary" sx={{ mt: 0.5 }} /></Paper>
        {app.official_hbridge_status && <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4, bgcolor: 'rgba(12, 41, 126, 0.03)' }}><Typography fontWeight={800} fontSize="0.85rem">Official H-bridge status (read-only)</Typography><Chip label={ENUMS.official_hbridge_status[app.official_hbridge_status]} size="small" color="secondary" sx={{ mt: 0.5 }} /></Paper>}
        {app.next_action_date && <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography fontWeight={800} fontSize="0.85rem">Next action date</Typography><Typography fontSize="0.85rem" sx={{ mt: 0.3 }}>{app.next_action_date}</Typography></Paper>}
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography fontWeight={800} fontSize="0.85rem">Student note</Typography><Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 0.3 }}>{app.student_note || 'No note added.'}</Typography></Paper>
      </Stack>}

      {tab === 'es' && <Stack spacing={2}>
        <Typography fontWeight={800}>ES / Questions</Typography>
        <Typography color="text.secondary" fontSize="0.82rem">Manage your Self PR, Gakuchika, and custom questions here.</Typography>
        {app.es_questions?.length ? app.es_questions.map((q, i) => <Paper key={i} variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography fontWeight={750} fontSize="0.85rem">{q.question}</Typography><Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 0.5 }}>{q.answer}</Typography></Paper>) : <Typography color="text.secondary" fontSize="0.85rem">No ES content yet. Start writing your Self PR and Gakuchika.</Typography>}
        {/* No individual review request button per MVP spec */}
      </Stack>}

      {tab === 'memo' && <Stack spacing={2}>
        <Typography fontWeight={800}>Interview Memo</Typography>
        <Typography color="text.secondary" fontSize="0.82rem">Record your interview notes and reflections.</Typography>
        {app.interview_memos?.length ? app.interview_memos.map((m, i) => <Paper key={i} variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography fontWeight={750} fontSize="0.85rem">{m.date} — {m.company}</Typography><Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 0.5 }}>{m.notes}</Typography></Paper>) : <Typography color="text.secondary" fontSize="0.85rem">No interview memos yet.</Typography>}
        {/* No interview practice request button per MVP spec */}
      </Stack>}

      {tab === 'feedback' && <Stack spacing={2}>
        <Typography fontWeight={800}>Selection Feedback</Typography>
        <Typography color="text.secondary" fontSize="0.82rem">Feedback published by H-bridge. Only shared feedback appears here.</Typography>
        {appFeedback.length ? appFeedback.map(f => <Paper key={f.id} variant="outlined" sx={{ p: 1.5, borderRadius: 4, bgcolor: 'rgba(16, 185, 129, 0.04)' }}>
          <Stack direction="row" spacing={0.6} sx={{ mb: 0.8 }}><Chip label={ENUMS.feedback_stage[f.stage]} size="small" /><Chip label={ENUMS.selection_result[f.result]} size="small" color={f.result === 'pass' ? 'success' : 'default'} /></Stack>
          <Typography fontSize="0.88rem">{f.student_facing_feedback}</Typography>
          {f.next_action && <Paper variant="outlined" sx={{ p: 1, mt: 1, borderRadius: 3, bgcolor: 'rgba(12, 41, 126, 0.03)' }}><Typography fontWeight={750} fontSize="0.8rem">Next action:</Typography><Typography fontSize="0.82rem">{f.next_action}</Typography></Paper>}
          {/* company_feedback_raw and internal_note are NEVER shown here */}
        </Paper>) : <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, textAlign: 'center' }}><VerifiedRounded color="primary" /><Typography fontWeight={800} fontSize="0.85rem" sx={{ mt: 0.5 }}>No published feedback yet</Typography><Typography color="text.secondary" fontSize="0.78rem">Feedback will appear here after H-bridge shares it with you.</Typography></Paper>}
      </Stack>}

      {tab === 'advice' && <Stack spacing={2}>
        <Typography fontWeight={800}>H-bridge Advice</Typography>
        <Typography color="text.secondary" fontSize="0.82rem">Selection and referral-related advice from H-bridge.</Typography>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, textAlign: 'center' }}><Typography color="text.secondary" fontSize="0.85rem">No advice published yet.</Typography></Paper>
      </Stack>}
    </Stack>
  );
}
