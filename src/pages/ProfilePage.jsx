import { useState } from 'react';
import { Box, Button, Chip, Divider, FormControlLabel, LinearProgress, MenuItem, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountTreeRounded, CheckCircleRounded } from '@mui/icons-material';
import { SectionLabel } from '../components/shared';
import { ENUMS } from '../data';

const requiredFields = ['full_name','email','nationality','university_name','graduation_year','graduation_month','japanese_level','japanese_speaking_confidence','desired_job_type','desired_location','regional_work_willingness','nationwide_relocation_willingness','current_visa_status','available_start_timing'];

function calcCompletion(p) {
  const allFields = [...requiredFields, 'phone','current_location','faculty','major_category','degree','english_level','other_languages','desired_industry','location_flexibility','long_term_work_intention','visa_expiry','resume_url','linkedin_url','github_url','portfolio_url'];
  const filled = allFields.filter(f => p[f] && String(p[f]).trim() !== '').length;
  return Math.round((filled / allFields.length) * 100);
}

export default function ProfilePage({ setPage, profile, setProfile }) {
  const [p, setP] = useState({ ...profile });
  const update = (field, value) => setP(prev => ({ ...prev, [field]: value }));
  const completion = calcCompletion(p);
  const missingRequired = requiredFields.filter(f => !p[f] || String(p[f]).trim() === '');

  const handleSave = () => {
    setProfile({ ...p, profile_completion_score: completion });
    setPage('dashboard');
  };

  return (
    <Box component="main" sx={{ maxWidth: 960, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
      <SectionLabel icon={<AccountTreeRounded fontSize="small" />}>Student profile</SectionLabel>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.6 }}>Build the context H-bridge needs to support you.</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 620 }}>Complete your profile so H-bridge can match you with the right opportunities and referrals.</Typography>

      {/* Completion bar */}
      <Paper variant="outlined" sx={{ mt: 2.5, p: 2, borderRadius: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={800}>Profile completion</Typography>
          <Chip label={`${completion}%`} color={completion >= 80 ? 'success' : completion >= 50 ? 'primary' : 'default'} size="small" />
        </Stack>
        <LinearProgress variant="determinate" value={completion} sx={{ mt: 1.2, height: 6, borderRadius: 8, bgcolor: 'rgba(12, 41, 126, 0.06)', '& .MuiLinearProgress-bar': { borderRadius: 8, background: 'linear-gradient(90deg, #10B981, #1B6FE8)' } }} />
        {missingRequired.length > 0 && <Typography color="text.secondary" fontSize="0.78rem" sx={{ mt: 1 }}>Missing required: {missingRequired.join(', ')}</Typography>}
      </Paper>

      {/* Basic Info */}
      <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
        <Typography variant="h3">Basic Information</Typography>
        <Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 0.4 }}>Personal details for your H-bridge profile.</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 2 }}>
          <TextField label="Full name *" value={p.full_name || ''} onChange={e => update('full_name', e.target.value)} />
          <TextField label="Email *" type="email" value={p.email || ''} onChange={e => update('email', e.target.value)} />
          <TextField label="Phone" value={p.phone || ''} onChange={e => update('phone', e.target.value)} />
          <TextField select label="Nationality *" value={p.nationality || ''} onChange={e => update('nationality', e.target.value)}>
            {['Vietnamese','Chinese','Korean','Nepalese','Indonesian','Myanmar','Bangladeshi','Indian','Sri Lankan','Thai','Filipino','Other'].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
          <TextField label="Current location" value={p.current_location || ''} onChange={e => update('current_location', e.target.value)} sx={{ gridColumn: { sm: 'span 2' } }} />
        </Box>
      </Paper>

      {/* Education */}
      <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
        <Typography variant="h3">Education</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 2 }}>
          <TextField label="University / School *" value={p.university_name || ''} onChange={e => update('university_name', e.target.value)} />
          <TextField label="Faculty / Department" value={p.faculty || ''} onChange={e => update('faculty', e.target.value)} />
          <TextField label="Major category" value={p.major_category || ''} onChange={e => update('major_category', e.target.value)} />
          <TextField select label="Degree" value={p.degree || ''} onChange={e => update('degree', e.target.value)}>
            {Object.entries(ENUMS.degree).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField select label="Graduation year *" value={p.graduation_year || ''} onChange={e => update('graduation_year', e.target.value)}>
            {[2024,2025,2026,2027,2028,2029,2030].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </TextField>
          <TextField select label="Graduation month *" value={p.graduation_month || ''} onChange={e => update('graduation_month', e.target.value)}>
            {[3,6,9,12].map(m => <MenuItem key={m} value={m}>{m}月</MenuItem>)}
          </TextField>
        </Box>
      </Paper>

      {/* Language */}
      <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
        <Typography variant="h3">Language</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 2 }}>
          <TextField select label="Japanese level *" value={p.japanese_level || ''} onChange={e => update('japanese_level', e.target.value)}>
            {Object.entries(ENUMS.japanese_level).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField select label="Japanese speaking confidence *" value={p.japanese_speaking_confidence || ''} onChange={e => update('japanese_speaking_confidence', e.target.value)}>
            {Object.entries(ENUMS.japanese_speaking_confidence).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField select label="English level" value={p.english_level || ''} onChange={e => update('english_level', e.target.value)}>
            {Object.entries(ENUMS.english_level).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField label="Other languages" value={p.other_languages || ''} onChange={e => update('other_languages', e.target.value)} />
        </Box>
      </Paper>

      {/* Career Preference */}
      <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
        <Typography variant="h3">Career Preference</Typography>
        <Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 0.4 }}>Regional work willingness and nationwide relocation willingness are important matching fields.</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 2 }}>
          <TextField select label="Desired job type *" value={p.desired_job_type || ''} onChange={e => update('desired_job_type', e.target.value)}>
            {Object.entries(ENUMS.desired_job_type).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField label="Desired industry" value={p.desired_industry || ''} onChange={e => update('desired_industry', e.target.value)} />
          <TextField select label="Desired location *" value={p.desired_location || ''} onChange={e => update('desired_location', e.target.value)}>
            {Object.entries(ENUMS.desired_location).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField label="Location flexibility" value={p.location_flexibility || ''} onChange={e => update('location_flexibility', e.target.value)} placeholder="e.g. Open to Kansai as well" />
          <TextField select label="Regional work willingness *" value={p.regional_work_willingness || ''} onChange={e => update('regional_work_willingness', e.target.value)}>
            {Object.entries(ENUMS.regional_work_willingness).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField select label="Nationwide relocation willingness *" value={p.nationwide_relocation_willingness || ''} onChange={e => update('nationwide_relocation_willingness', e.target.value)}>
            {Object.entries(ENUMS.nationwide_relocation_willingness).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField select label="Long-term work intention in Japan" value={p.long_term_work_intention || ''} onChange={e => update('long_term_work_intention', e.target.value)} sx={{ gridColumn: { sm: 'span 2' } }}>
            <MenuItem value="yes">はい（長期的に日本で働きたい）</MenuItem>
            <MenuItem value="considering">検討中</MenuItem>
            <MenuItem value="not_sure">未定</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* Visa / Availability */}
      <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
        <Typography variant="h3">Visa / Availability</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 2 }}>
          <TextField select label="Current visa status *" value={p.current_visa_status || ''} onChange={e => update('current_visa_status', e.target.value)}>
            {Object.entries(ENUMS.visa_status).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField label="Visa expiry date" type="date" value={p.visa_expiry || ''} onChange={e => update('visa_expiry', e.target.value)} InputLabelProps={{ shrink: true }} />
          <FormControlLabel control={<Switch checked={!!p.need_visa_support} onChange={e => update('need_visa_support', e.target.checked)} />} label="Need visa support from employer" sx={{ gridColumn: { sm: 'span 2' } }} />
          <TextField select label="Available start timing *" value={p.available_start_timing || ''} onChange={e => update('available_start_timing', e.target.value)}>
            {Object.entries(ENUMS.start_timing).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
        </Box>
      </Paper>

      {/* Resume / Links */}
      <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
        <Typography variant="h3">Resume / Links</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5, mt: 2 }}>
          <TextField label="Resume URL" value={p.resume_url || ''} onChange={e => update('resume_url', e.target.value)} placeholder="Google Drive, Dropbox, etc." />
          <TextField label="LinkedIn URL" value={p.linkedin_url || ''} onChange={e => update('linkedin_url', e.target.value)} />
          <TextField label="GitHub URL" value={p.github_url || ''} onChange={e => update('github_url', e.target.value)} />
          <TextField label="Portfolio URL" value={p.portfolio_url || ''} onChange={e => update('portfolio_url', e.target.value)} />
        </Box>
      </Paper>

      {/* Actions */}
      <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2.5 }}>
        <Button onClick={() => setPage('dashboard')}>Save later</Button>
        <Button variant="contained" onClick={handleSave}>Save profile</Button>
      </Stack>
    </Box>
  );
}
