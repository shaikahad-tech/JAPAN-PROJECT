import { useState } from 'react';
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, LinearProgress, List, ListItem, ListItemText, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountTreeRounded, ApartmentRounded, BookmarkRounded, BusinessCenterRounded, CalendarMonthRounded, Diversity3Rounded, InsightsRounded, SearchRounded, SettingsRounded, TuneRounded, VerifiedRounded, WarningAmberRounded } from '@mui/icons-material';
import { SectionLabel } from '../components/shared';
import { companies, events as eventPrograms, jobs, mockStudents, mockApplications, mockCareerCheck, mockSelectionFeedback, mockSupportRequests, mockAdminNotes, ENUMS } from '../data';

const adminMenus = ['Overview', 'Students', 'Applications', 'Referral Requests', 'Interested', 'Selection Feedback', 'Events', 'Companies', 'Jobs', 'Settings'];

// ─── Admin Workspace Container ───────────────────────────────────────────────
export default function AdminWorkspace({ referrals, supportRequests, setPage }) {
  const [section, setSection] = useState('Overview');
  const [studentDetail, setStudentDetail] = useState(null);

  const content = {
    Overview: <AdminOverview referrals={referrals} supportRequests={supportRequests} />,
    Students: studentDetail ? <StudentDetail student={studentDetail} onBack={() => setStudentDetail(null)} /> : <StudentsList onOpen={setStudentDetail} />,
    Applications: <ApplicationsAdmin />,
    'Referral Requests': <ReferralRequestsAdmin referrals={referrals} />,
    Interested: <InterestedAdmin />,
    'Selection Feedback': <SelectionFeedbackAdmin />,
    Events: <EventsAdmin />,
    Companies: <CompaniesAdmin />,
    Jobs: <JobsAdmin />,
    Settings: <AdminSettings />
  };

  return <Box component="main" sx={{ minHeight: 'calc(100vh - 72px)', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '230px minmax(0, 1fr)' } }}>
    {/* Sidebar */}
    <Paper square elevation={0} sx={{ display: { xs: 'none', md: 'block' }, p: 2, borderRight: '1px solid', borderColor: 'divider', bgcolor: '#FAFBFE' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1, pb: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(12, 41, 126, 0.06)', color: 'primary.main' }}><Diversity3Rounded /></Avatar>
        <Box><Typography fontWeight={850} fontSize="0.85rem">H-bridge Operations</Typography><Typography color="text.secondary" fontSize="0.68rem">Admin panel</Typography></Box>
      </Stack>
      <Stack spacing={0.3}>{adminMenus.map(item => <Button key={item} onClick={() => { setSection(item); setStudentDetail(null); }} variant={section === item ? 'contained' : 'text'} color={section === item ? 'primary' : 'inherit'} sx={{ justifyContent: 'flex-start', color: section === item ? 'white' : 'text.secondary', fontSize: '0.78rem' }}>{item}</Button>)}</Stack>
      <Button onClick={() => setPage('dashboard')} sx={{ mt: 3, width: '100%' }} variant="outlined">Student view</Button>
    </Paper>
    <Box sx={{ p: { xs: 1.5, md: 3.5 }, bgcolor: '#F7F8FB' }}>
      {/* Mobile chips */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.75, overflowX: 'auto', pb: 1.5 }}>{adminMenus.map(item => <Chip key={item} label={item} onClick={() => { setSection(item); setStudentDetail(null); }} color={section === item ? 'primary' : 'default'} variant={section === item ? 'filled' : 'outlined'} />)}</Box>
      {content[section]}
    </Box>
  </Box>;
}

// ─── Admin Overview ──────────────────────────────────────────────────────────
function AdminOverview({ referrals, supportRequests }) {
  const needReview = mockApplications.filter(a => ['withdrawn','rejected','closed'].includes(a.student_tracking_status) && a.application_mode !== 'self_tracking');
  const cards = [
    ['Referral requests', referrals.length ? `${referrals.length} pending` : 'All clear', <Diversity3Rounded />],
    ['Students needing review', `${mockStudents.length} registered`, <AccountTreeRounded />],
    ['Feedback to publish', `${mockSelectionFeedback.filter(f => !f.share_with_student).length} unpublished`, <VerifiedRounded />],
    ['Support updates', supportRequests.length ? `${supportRequests.length} open` : 'No unread', <InsightsRounded />]
  ];
  return <>
    <SectionLabel icon={<Diversity3Rounded fontSize="small" />}>Operations overview</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>The work behind the bridge.</Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 1.5, mt: 2.5 }}>
      {cards.map(([label, detail, icon]) => <Paper key={label} variant="outlined" sx={{ p: 1.8, borderRadius: 4 }}><Avatar sx={{ bgcolor: 'rgba(12, 41, 126, 0.06)', color: 'primary.main' }}>{icon}</Avatar><Typography fontWeight={800} sx={{ mt: 1.2 }}>{label}</Typography><Typography color="text.secondary" fontSize="0.78rem">{detail}</Typography></Paper>)}
    </Box>
    {needReview.length > 0 && <Paper variant="outlined" sx={{ mt: 2, p: 2, borderRadius: 5, borderColor: 'rgba(245, 158, 11, 0.3)', bgcolor: 'rgba(245, 158, 11, 0.04)' }}>
      <Stack direction="row" spacing={1} alignItems="center"><WarningAmberRounded color="warning" /><Typography fontWeight={800}>Need Review: {needReview.length} application(s) changed by student</Typography></Stack>
      <Typography color="text.secondary" fontSize="0.82rem" sx={{ mt: 0.5 }}>Student changed H-bridge application status to withdrawn, rejected, or closed.</Typography>
    </Paper>}
    <Paper variant="outlined" sx={{ mt: 2, p: 2.2, borderRadius: 5 }}>
      <SectionLabel icon={<VerifiedRounded fontSize="small" />}>Privacy guardrail</SectionLabel>
      <Typography variant="h3" sx={{ mt: 0.7 }}>Student-safe by design</Typography>
      <Typography color="text.secondary" fontSize="0.83rem" lineHeight={1.55} sx={{ mt: 0.75 }}>Internal notes, raw company feedback, and official status controls are separated from student screens.</Typography>
    </Paper>
  </>;
}

// ─── Students List ───────────────────────────────────────────────────────────
function StudentsList({ onOpen }) {
  const [filters, setFilters] = useState({ search: '', grad_year: '', jp_level: '', regional: '', visa: '' });
  const filtered = mockStudents.filter(s => {
    if (filters.search && !s.full_name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.grad_year && s.graduation_year !== Number(filters.grad_year)) return false;
    if (filters.jp_level && s.japanese_level !== filters.jp_level) return false;
    if (filters.regional && s.regional_work_willingness !== filters.regional) return false;
    if (filters.visa && s.current_visa_status !== filters.visa) return false;
    return true;
  });
  return <>
    <SectionLabel icon={<AccountTreeRounded fontSize="small" />}>Student management</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Student context, ready for review.</Typography>
    <Paper variant="outlined" sx={{ mt: 2, p: 1.5, borderRadius: 5 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 1 }}>
        <TextField size="small" placeholder="Search by name" value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment> }} />
        <TextField select size="small" label="Graduation" value={filters.grad_year} onChange={e => setFilters(f => ({ ...f, grad_year: e.target.value }))}><MenuItem value="">All</MenuItem>{[2025,2026,2027,2028].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}</TextField>
        <TextField select size="small" label="Japanese" value={filters.jp_level} onChange={e => setFilters(f => ({ ...f, jp_level: e.target.value }))}><MenuItem value="">All</MenuItem>{Object.entries(ENUMS.japanese_level).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField>
        <TextField select size="small" label="Regional work" value={filters.regional} onChange={e => setFilters(f => ({ ...f, regional: e.target.value }))}><MenuItem value="">All</MenuItem>{Object.entries(ENUMS.regional_work_willingness).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField>
        <TextField select size="small" label="Visa" value={filters.visa} onChange={e => setFilters(f => ({ ...f, visa: e.target.value }))}><MenuItem value="">All</MenuItem>{Object.entries(ENUMS.visa_status).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField>
      </Box>
    </Paper>
    <Stack spacing={1.2} sx={{ mt: 1.5 }}>{filtered.map(s => <Paper key={s.id} variant="outlined" sx={{ p: 2, borderRadius: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Avatar sx={{ bgcolor: 'rgba(12, 41, 126, 0.06)', color: 'primary.main' }}><AccountTreeRounded /></Avatar>
          <Box>
            <Typography fontWeight={800}>{s.full_name}</Typography>
            <Typography color="text.secondary" fontSize="0.76rem">{s.university_name} · {s.graduation_year}年{s.graduation_month}月卒</Typography>
          </Box>
        </Stack>
        <Button onClick={() => onOpen(s)} variant="contained" size="small">Detail</Button>
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
        <Chip label={`JP: ${ENUMS.japanese_level[s.japanese_level]}`} size="small" color="primary" variant="outlined" />
        <Chip label={ENUMS.regional_work_willingness[s.regional_work_willingness]} size="small" variant="outlined" />
        <Chip label={ENUMS.visa_status[s.current_visa_status]} size="small" variant="outlined" />
        <Chip label={`Profile: ${s.profile_completion_score}%`} size="small" color={s.profile_completion_score >= 80 ? 'success' : 'default'} variant="outlined" />
      </Stack>
    </Paper>)}</Stack>
  </>;
}

// ─── Student Detail ──────────────────────────────────────────────────────────
function StudentDetail({ student, onBack }) {
  const [tab, setTab] = useState('profile');
  const studentApps = mockApplications.filter(a => a.student_id === student.id);
  const studentFeedback = mockSelectionFeedback;
  const studentNotes = mockAdminNotes.filter(n => n.student_id === student.id);

  return <>
    <Button onClick={onBack} sx={{ px: 0 }}>← Back to students</Button>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5 }}>{student.full_name}</Typography>
    <Typography color="text.secondary">{student.university_name} · {student.nationality}</Typography>
    <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" sx={{ mt: 2, minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5, fontSize: '0.75rem' } }}>
      <Tab value="profile" label="Profile" /><Tab value="career" label="Career Check" /><Tab value="apps" label="Applications" /><Tab value="interested" label="Interested" /><Tab value="events" label="Events" /><Tab value="feedback" label="All Feedback" /><Tab value="notes" label="Admin Notes" />
    </Tabs>
    <Divider />
    <Box sx={{ mt: 2 }}>
      {tab === 'profile' && <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.2 }}>
        {Object.entries({ 'Full name': student.full_name, Email: student.email, Nationality: student.nationality, University: student.university_name, 'Graduation': `${student.graduation_year}年${student.graduation_month}月`, 'Japanese level': ENUMS.japanese_level[student.japanese_level], 'Speaking confidence': ENUMS.japanese_speaking_confidence[student.japanese_speaking_confidence], 'Desired job': ENUMS.desired_job_type[student.desired_job_type], 'Desired location': ENUMS.desired_location[student.desired_location], 'Regional work': ENUMS.regional_work_willingness[student.regional_work_willingness], 'Nationwide relocation': ENUMS.nationwide_relocation_willingness[student.nationwide_relocation_willingness], 'Visa': ENUMS.visa_status[student.current_visa_status], 'Profile score': `${student.profile_completion_score}%` }).map(([k, v]) => <Paper key={k} variant="outlined" sx={{ p: 1.2, borderRadius: 3 }}><Typography fontSize="0.72rem" color="text.secondary">{k}</Typography><Typography fontWeight={750} fontSize="0.88rem">{v || '—'}</Typography></Paper>)}
      </Box>}
      {tab === 'career' && <Paper variant="outlined" sx={{ p: 2, borderRadius: 5 }}>
        <Typography variant="h3">Career Readiness Score: {mockCareerCheck.total_score}/100</Typography>
        <Stack spacing={1} sx={{ mt: 1.5 }}>{Object.entries(mockCareerCheck.scores).map(([k, v]) => <Box key={k}><Stack direction="row" justifyContent="space-between"><Typography fontSize="0.82rem">{k.replace(/_/g, ' ')}</Typography><Typography fontWeight={750} fontSize="0.82rem">{v}</Typography></Stack><LinearProgress variant="determinate" value={v * (100 / (k === 'japanese_communication' ? 25 : k === 'resume_readiness' ? 20 : k === 'visa_clarity' ? 10 : 15))} sx={{ mt: 0.3, height: 6, borderRadius: 6 }} /></Box>)}</Stack>
      </Paper>}
      {tab === 'apps' && <Stack spacing={1}>{studentApps.length ? studentApps.map(a => <Paper key={a.id} variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between"><Typography fontWeight={800} fontSize="0.88rem">{a.external_company_name || companies.find(c => c.id === a.company_id)?.name}</Typography><Chip label={ENUMS.application_mode[a.application_mode]} size="small" color="primary" variant="outlined" /></Stack>
        <Stack direction="row" gap={0.5} sx={{ mt: 0.5 }}><Chip label={`Student: ${ENUMS.student_tracking_status[a.student_tracking_status]}`} size="small" />{a.official_hbridge_status && <Chip label={`H-bridge: ${ENUMS.official_hbridge_status[a.official_hbridge_status]}`} size="small" color="secondary" />}</Stack>
      </Paper>) : <Typography color="text.secondary">No applications.</Typography>}</Stack>}
      {tab === 'interested' && <Typography color="text.secondary">Interested companies are managed in the student workspace.</Typography>}
      {tab === 'events' && <Typography color="text.secondary">Event participation history will be shown here.</Typography>}
      {tab === 'feedback' && <Stack spacing={1}><Typography fontWeight={800}>All feedback (Admin view — includes unpublished)</Typography>{studentFeedback.map(f => <Paper key={f.id} variant="outlined" sx={{ p: 1.5, borderRadius: 4, bgcolor: f.share_with_student ? 'rgba(16, 185, 129, 0.04)' : 'rgba(245, 158, 11, 0.04)' }}>
        <Stack direction="row" spacing={0.5}><Chip label={ENUMS.feedback_stage[f.stage]} size="small" /><Chip label={ENUMS.selection_result[f.result]} size="small" /><Chip label={f.share_with_student ? 'Shared ✓' : 'Not shared'} size="small" color={f.share_with_student ? 'success' : 'warning'} /></Stack>
        <Typography fontSize="0.85rem" sx={{ mt: 0.8 }}><strong>Student-facing:</strong> {f.student_facing_feedback || '(empty)'}</Typography>
        <Typography fontSize="0.85rem" color="error.main" sx={{ mt: 0.5 }}><strong>Raw (INTERNAL):</strong> {f.company_feedback_raw || '(empty)'}</Typography>
        <Typography fontSize="0.85rem" color="error.main"><strong>Internal note:</strong> {f.internal_note || '(empty)'}</Typography>
      </Paper>)}</Stack>}
      {tab === 'notes' && <Stack spacing={1.5}>
        <Typography fontWeight={800}>Admin Notes — NEVER visible to students</Typography>
        {studentNotes.map(n => <Paper key={n.id} variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography fontSize="0.85rem">{n.note}</Typography><Typography color="text.secondary" fontSize="0.72rem" sx={{ mt: 0.5 }}>{new Date(n.created_at).toLocaleDateString()}</Typography></Paper>)}
        <TextField multiline minRows={4} fullWidth label="New admin note" placeholder="Private note — never shown to student" />
        <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Save note</Button>
      </Stack>}
    </Box>
  </>;
}

// ─── Referral Requests Admin ─────────────────────────────────────────────────
function ReferralRequestsAdmin({ referrals }) {
  const refApps = mockApplications.filter(a => a.application_mode === 'hbridge_review' || a.application_mode === 'hbridge_referral');
  return <>
    <SectionLabel icon={<Diversity3Rounded fontSize="small" />}>Referral requests</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Review student referral requests.</Typography>
    <Stack spacing={1.2} sx={{ mt: 2 }}>
      {refApps.map(a => {
        const co = companies.find(c => c.id === a.company_id);
        return <Paper key={a.id} variant="outlined" sx={{ p: 2, borderRadius: 5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box><Typography fontWeight={800}>{co?.name || 'Unknown'}</Typography><Typography color="text.secondary" fontSize="0.78rem">Requested: {a.referral_requested_at ? new Date(a.referral_requested_at).toLocaleDateString() : '—'}</Typography></Box>
            <TextField select size="small" label="Official status" defaultValue={a.official_hbridge_status || 'hbridge_review_required'} sx={{ minWidth: 200 }}>
              {Object.entries(ENUMS.official_hbridge_status).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={0.8} sx={{ mt: 1 }}><Button variant="contained" size="small">Start Review</Button><Button variant="outlined" size="small">Request Info</Button><Button variant="outlined" size="small">Prepare Referral</Button></Stack>
        </Paper>;
      })}
      {!refApps.length && <Typography color="text.secondary">No referral requests.</Typography>}
    </Stack>
  </>;
}

// ─── Applications Admin ──────────────────────────────────────────────────────
function ApplicationsAdmin() {
  return <>
    <SectionLabel icon={<BusinessCenterRounded fontSize="small" />}>Applications management</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Manage applications and official status.</Typography>
    <Paper variant="outlined" sx={{ mt: 2, p: 0, borderRadius: 5, overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, '& th': { textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary', p: 1.2, borderBottom: '2px solid rgba(12, 41, 126, 0.06)', bgcolor: 'rgba(12, 41, 126, 0.02)' }, '& td': { fontSize: '0.82rem', p: 1.2, borderBottom: '1px solid rgba(12, 41, 126, 0.06)' } }}>
          <thead><tr><th>Company</th><th>Source</th><th>Mode</th><th>Student Status</th><th>Official Status</th></tr></thead>
          <tbody>{mockApplications.map(a => {
            const co = companies.find(c => c.id === a.company_id);
            return <tr key={a.id}>
              <td><Typography fontWeight={750} fontSize="0.85rem">{a.external_company_name || co?.name}</Typography></td>
              <td><Chip label={ENUMS.application_source[a.application_source]} size="small" variant="outlined" /></td>
              <td><Chip label={ENUMS.application_mode[a.application_mode]} size="small" color={a.application_mode === 'hbridge_referral' ? 'secondary' : 'primary'} variant="outlined" /></td>
              <td>{ENUMS.student_tracking_status[a.student_tracking_status]}</td>
              <td>{a.official_hbridge_status ? <TextField select size="small" defaultValue={a.official_hbridge_status} sx={{ minWidth: 160 }}>{Object.entries(ENUMS.official_hbridge_status).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField> : '—'}</td>
            </tr>;
          })}</tbody>
        </Box>
      </Box>
    </Paper>
  </>;
}

// ─── Interested Admin ────────────────────────────────────────────────────────
function InterestedAdmin() {
  return <>
    <SectionLabel icon={<BookmarkRounded fontSize="small" />}>Interested tracking</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Student interest analysis.</Typography>
    <Typography color="text.secondary" sx={{ mt: 0.75 }}>Interested records are bookmarks. They do not create applications. Useful for analysis.</Typography>
    <Paper variant="outlined" sx={{ mt: 2, p: 2, borderRadius: 5 }}><Typography color="text.secondary">Interest data will be populated when students save companies.</Typography></Paper>
  </>;
}

// ─── Selection Feedback Admin (with Publish Safeguard) ───────────────────────
function SelectionFeedbackAdmin() {
  const [publishDialog, setPublishDialog] = useState(null);
  const [feedbackList, setFeedbackList] = useState(mockSelectionFeedback);

  const handlePublish = (fb) => {
    setFeedbackList(prev => prev.map(f => f.id === fb.id ? { ...f, share_with_student: true, published_at: new Date().toISOString() } : f));
    setPublishDialog(null);
  };

  return <>
    <SectionLabel icon={<VerifiedRounded fontSize="small" />}>Selection feedback</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Prepare feedback before you share it.</Typography>
    <Typography color="text.secondary" sx={{ mt: 0.75 }}>Student sees feedback ONLY after the publish safeguard confirmation.</Typography>

    {/* Existing feedback */}
    <Stack spacing={1.2} sx={{ mt: 2 }}>
      {feedbackList.map(f => <Paper key={f.id} variant="outlined" sx={{ p: 2, borderRadius: 5, bgcolor: f.share_with_student ? 'rgba(16, 185, 129, 0.04)' : undefined }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.5}><Chip label={ENUMS.feedback_stage[f.stage]} size="small" /><Chip label={ENUMS.selection_result[f.result]} size="small" color={f.result === 'pass' ? 'success' : 'warning'} /><Chip label={f.share_with_student ? '✓ Shared' : '✗ Not shared'} size="small" color={f.share_with_student ? 'success' : 'default'} /></Stack>
          {!f.share_with_student && <Button variant="contained" size="small" color="secondary" onClick={() => setPublishDialog(f)}>Share with student</Button>}
        </Stack>
        <Typography fontSize="0.82rem" sx={{ mt: 1 }}><strong>Student-facing:</strong> {f.student_facing_feedback || '(not written)'}</Typography>
        <Typography fontSize="0.82rem" color="error.main"><strong>Raw (INTERNAL):</strong> {f.company_feedback_raw || '—'}</Typography>
        <Typography fontSize="0.82rem" color="error.main"><strong>Internal note:</strong> {f.internal_note || '—'}</Typography>
      </Paper>)}
    </Stack>

    {/* New feedback form */}
    <Paper variant="outlined" sx={{ mt: 2.5, p: { xs: 2, md: 3 }, borderRadius: 5 }}>
      <Typography variant="h3">Create new feedback</Typography>
      <Stack spacing={1.5} sx={{ mt: 1.5 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
          <TextField select label="Feedback stage" defaultValue="">{Object.entries(ENUMS.feedback_stage).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField>
          <TextField select label="Result" defaultValue="">{Object.entries(ENUMS.selection_result).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField>
        </Box>
        <Box><Typography fontWeight={750} fontSize="0.82rem" sx={{ mb: 0.5 }}>Reason codes</Typography><Stack direction="row" flexWrap="wrap" gap={0.5}>{Object.entries(ENUMS.feedback_reason_code).map(([k, v]) => <Chip key={k} label={v} size="small" clickable variant="outlined" />)}</Stack></Box>
        <TextField label="Company feedback raw" multiline minRows={3} placeholder="INTERNAL — Never visible to student" helperText="⚠️ This field is NEVER shown to students" />
        <TextField label="Internal note" multiline minRows={2} placeholder="INTERNAL — Never visible to student" helperText="⚠️ This field is NEVER shown to students" />
        <Divider />
        <TextField label="Student-facing feedback" multiline minRows={4} placeholder="This text WILL be shown to the student when shared" helperText="✓ This is what the student will see" />
        <TextField label="Next action for student" multiline minRows={2} placeholder="Recommended next step for the student" />
        <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Save feedback (not shared yet)</Button>
      </Stack>
    </Paper>

    {/* ─── FEEDBACK PUBLISH SAFEGUARD MODAL ─────────────────────────────── */}
    <Dialog open={Boolean(publishDialog)} onClose={() => setPublishDialog(null)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'rgba(245, 158, 11, 0.06)' }}>
        <Stack direction="row" spacing={1} alignItems="center"><WarningAmberRounded color="warning" /><Typography fontWeight={800}>Preview: Student will see this</Typography></Stack>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography fontWeight={800} color="primary.main" sx={{ mb: 1 }}>Student-facing feedback:</Typography>
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4, bgcolor: 'rgba(16, 185, 129, 0.04)' }}>
          <Typography>{publishDialog?.student_facing_feedback || '(empty — student will see an empty feedback)'}</Typography>
        </Paper>
        {publishDialog?.next_action && <>
          <Typography fontWeight={800} color="primary.main" sx={{ mt: 1.5, mb: 0.5 }}>Next action:</Typography>
          <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4 }}><Typography>{publishDialog.next_action}</Typography></Paper>
        </>}
        <Divider sx={{ my: 2 }} />
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 4, bgcolor: 'rgba(244, 63, 94, 0.04)', borderColor: 'rgba(244, 63, 94, 0.14)' }}>
          <Typography fontWeight={800} color="error.main" fontSize="0.85rem">⚠ Company feedback raw and internal notes will NOT be shared.</Typography>
          <Typography color="text.secondary" fontSize="0.82rem" sx={{ mt: 0.5 }}>These fields remain internal and invisible to the student.</Typography>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setPublishDialog(null)}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={() => handlePublish(publishDialog)}>Yes, share this feedback</Button>
      </DialogActions>
    </Dialog>
  </>;
}

// ─── Events Admin ────────────────────────────────────────────────────────────
function EventsAdmin() {
  return <>
    <SectionLabel icon={<CalendarMonthRounded fontSize="small" />}>Event operations</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Events that scale support.</Typography>
    <Paper variant="outlined" sx={{ mt: 2, p: 0, borderRadius: 5, overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 600, '& th': { textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', color: 'text.secondary', p: 1.2, borderBottom: '2px solid rgba(12, 41, 126, 0.06)' }, '& td': { fontSize: '0.82rem', p: 1.2, borderBottom: '1px solid rgba(12, 41, 126, 0.06)' } }}>
          <thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Participants</th><th>Status</th></tr></thead>
          <tbody>{eventPrograms.map(e => <tr key={e.id}><td><Typography fontWeight={750} fontSize="0.85rem">{e.title}</Typography></td><td><Chip label={ENUMS.event_type[e.event_type]} size="small" /></td><td>{new Date(e.date).toLocaleDateString()}</td><td>{e.participants_count}/{e.capacity}</td><td><Chip label={ENUMS.publish_status[e.status]} size="small" color="success" variant="outlined" /></td></tr>)}</tbody>
        </Box>
      </Box>
    </Paper>
    <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 5 }}>
      <Typography variant="h3">Create new event</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 1.5 }}>
        <TextField label="Event title" /><TextField select label="Event type" defaultValue="">{Object.entries(ENUMS.event_type).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}</TextField>
        <TextField label="Date" type="datetime-local" InputLabelProps={{ shrink: true }} /><TextField label="Capacity" type="number" />
        <TextField label="Mode" placeholder="Online / In-person / Hybrid" /><TextField select label="Company (optional)" defaultValue=""><MenuItem value="">None</MenuItem>{companies.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}</TextField>
      </Box>
      <Button variant="contained" sx={{ mt: 2 }}>Create event</Button>
    </Paper>
  </>;
}

// ─── Companies Admin ─────────────────────────────────────────────────────────
function CompaniesAdmin() {
  return <>
    <SectionLabel icon={<ApartmentRounded fontSize="small" />}>Companies</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>Manage company listings.</Typography>
    <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 1.5 }}>
      {companies.map(c => <Paper key={c.id} variant="outlined" sx={{ p: 1.65, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center"><Avatar sx={{ background: `linear-gradient(135deg, ${c.tone[0]}, ${c.tone[1]})` }}><ApartmentRounded fontSize="small" /></Avatar><Box><Typography fontWeight={800} fontSize="0.84rem">{c.name}</Typography><Typography color="text.secondary" fontSize="0.74rem">{c.industry}</Typography></Box></Stack>
          <Stack direction="row" spacing={0.5}>{c.featured && <Chip label="Featured" size="small" color="warning" variant="outlined" />}<Chip label="Published" size="small" color="success" variant="outlined" /></Stack>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={0.4} sx={{ mt: 1 }}>
          <Chip label={`JP: ${ENUMS.japanese_level[c.japanese_level_required]}`} size="small" sx={{ fontSize: '0.65rem' }} />
          {c.foreign_student_friendly && <Chip label="留学生歓迎" size="small" color="success" sx={{ fontSize: '0.65rem' }} />}
          {c.regional_work && <Chip label="地方勤務" size="small" sx={{ fontSize: '0.65rem' }} />}
          {c.nationwide_relocation && <Chip label="全国転勤" size="small" sx={{ fontSize: '0.65rem' }} />}
        </Stack>
        <Typography color="text.secondary" fontSize="0.78rem" sx={{ mt: 0.8 }}>Jobs: {jobs.filter(j => j.company_id === c.id).length} · Locations: {c.work_locations?.join(', ')}</Typography>
      </Paper>)}
    </Box>
  </>;
}

// ─── Jobs Admin ──────────────────────────────────────────────────────────────
function JobsAdmin() {
  return <>
    <SectionLabel icon={<BusinessCenterRounded fontSize="small" />}>Jobs</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>All open positions.</Typography>
    <Paper variant="outlined" sx={{ mt: 2, p: 0, borderRadius: 5, overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, '& th': { textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', color: 'text.secondary', p: 1.2, borderBottom: '2px solid rgba(12, 41, 126, 0.06)' }, '& td': { fontSize: '0.82rem', p: 1.2, borderBottom: '1px solid rgba(12, 41, 126, 0.06)' } }}>
          <thead><tr><th>Title</th><th>Company</th><th>Location</th><th>JP Level</th><th>Type</th><th>Features</th></tr></thead>
          <tbody>{jobs.map(j => {
            const co = companies.find(c => c.id === j.company_id);
            return <tr key={j.id}><td><Typography fontWeight={750} fontSize="0.85rem">{j.title}</Typography></td><td>{co?.name}</td><td>{j.location}</td><td>{ENUMS.japanese_level[j.japanese_level_required]}</td><td>{j.employment_type}</td><td><Stack direction="row" gap={0.3}>{j.housing_support && <Chip label="住宅" size="small" sx={{ fontSize: '0.6rem' }} />}{j.regional_placement && <Chip label="地方" size="small" sx={{ fontSize: '0.6rem' }} />}{j.nationwide_transfer && <Chip label="転勤" size="small" sx={{ fontSize: '0.6rem' }} />}</Stack></td></tr>;
          })}</tbody>
        </Box>
      </Box>
    </Paper>
  </>;
}

// ─── Settings ────────────────────────────────────────────────────────────────
function AdminSettings() {
  return <>
    <SectionLabel icon={<SettingsRounded fontSize="small" />}>Settings</SectionLabel>
    <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5 }}>System settings</Typography>
    <Paper variant="outlined" sx={{ mt: 2, p: 3, borderRadius: 5 }}><Typography color="text.secondary">Settings will be available when backend is connected.</Typography></Paper>
  </>;
}
