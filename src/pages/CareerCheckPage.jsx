import { useState } from 'react';
import { Box, Button, Chip, Divider, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowOutwardRounded, CheckCircleRounded, InsightsRounded, PsychologyAltRounded } from '@mui/icons-material';
import { SectionLabel } from '../components/shared';

const questions = [
  { id: 'japanese_confidence', area: 'Japanese communication', maxPts: 25, question: 'How do you feel about communicating in Japanese for work?', options: [
    { label: 'Business level — comfortable in professional settings', points: 25 },
    { label: 'Daily conversation — comfortable in everyday situations', points: 18 },
    { label: 'Basic conversation — building confidence now', points: 10 }
  ]},
  { id: 'interview_confidence', area: 'Japanese communication', maxPts: 0, question: 'How confident are you about Japanese interviews?', options: [
    { label: 'Ready for Japanese-language interviews', points: 5 },
    { label: 'Need preparation but can try', points: 0 },
    { label: 'Not ready yet', points: -3 }
  ]},
  { id: 'career_direction', area: 'Job clarity', maxPts: 15, question: 'How clear is the work you want to explore?', options: [
    { label: 'I have a focused direction', points: 15 },
    { label: 'I am comparing a few paths', points: 10 },
    { label: 'I want help discovering options', points: 5 }
  ]},
  { id: 'resume_readiness', area: 'Resume / ES readiness', maxPts: 20, question: 'How ready are your resume and ES (entry sheet)?', options: [
    { label: 'Resume and ES ready to submit', points: 20 },
    { label: 'In progress — need some refinement', points: 12 },
    { label: 'Not started yet', points: 4 }
  ]},
  { id: 'interview_preparation', area: 'Interview readiness', maxPts: 15, question: 'How prepared are you for interviews?', options: [
    { label: 'Practiced and ready', points: 15 },
    { label: 'Some preparation done', points: 9 },
    { label: 'Not yet started', points: 3 }
  ]},
  { id: 'japan_motivation', area: 'Japan work motivation', maxPts: 15, question: 'What is your long-term intention for working in Japan?', options: [
    { label: 'Committed to a career in Japan', points: 15 },
    { label: 'Considering Japan as an option', points: 10 },
    { label: 'Still exploring different countries', points: 5 }
  ]},
  { id: 'visa_clarity', area: 'Visa / availability clarity', maxPts: 10, question: 'How clear is your visa and availability situation?', options: [
    { label: 'Clear visa status and start timing', points: 10 },
    { label: 'Need some clarification', points: 6 },
    { label: 'Unclear — need support', points: 2 }
  ]}
];

const scoreAreas = [
  { key: 'japanese_communication', label: 'Japanese communication', max: 25, color: '#1B6FE8' },
  { key: 'job_clarity', label: 'Job clarity', max: 15, color: '#10B981' },
  { key: 'resume_readiness', label: 'Resume / ES readiness', max: 20, color: '#2D4FA5' },
  { key: 'interview_readiness', label: 'Interview readiness', max: 15, color: '#34D399' },
  { key: 'japan_motivation', label: 'Japan work motivation', max: 15, color: '#167B72' },
  { key: 'visa_clarity', label: 'Visa / availability clarity', max: 10, color: '#4AC5EC' }
];

export default function CareerCheckPage({ careerCheck, setCareerCheck, setPage }) {
  const [answers, setAnswers] = useState({});
  const ready = Object.keys(answers).length === questions.length;

  const calculateScores = () => {
    const jpBase = answers.japanese_confidence?.points || 0;
    const jpBonus = answers.interview_confidence?.points || 0;
    const jpTotal = Math.max(0, Math.min(25, jpBase + jpBonus));
    return {
      japanese_communication: jpTotal,
      job_clarity: answers.career_direction?.points || 0,
      resume_readiness: answers.resume_readiness?.points || 0,
      interview_readiness: answers.interview_preparation?.points || 0,
      japan_motivation: answers.japan_motivation?.points || 0,
      visa_clarity: answers.visa_clarity?.points || 0
    };
  };

  const handleComplete = () => {
    const scores = calculateScores();
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    setCareerCheck({
      scores, total_score: total, max_score: 100,
      completed_at: new Date().toISOString(),
      answers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.label]))
    });
  };

  // Completed view
  if (careerCheck) {
    const weakest = scoreAreas.reduce((w, a) => {
      const pct = (careerCheck.scores[a.key] || 0) / a.max;
      return pct < w.pct ? { ...a, pct } : w;
    }, { pct: 1, label: '' });

    return (
      <Box component="main" sx={{ maxWidth: 980, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 3, md: 5 }, pb: { xs: 10 } }}>
        <Paper className="aurora-card" elevation={0} sx={{ p: { xs: 2.5, md: 4 }, overflow: 'hidden', color: 'white', borderRadius: 4, background: 'linear-gradient(135deg, #13151B, #1B3A5C 55%, #1B6FE8)' }}>
          <Box className="glow-orbit" />
          <Box position="relative">
            <SectionLabel icon={<CheckCircleRounded />} sx={{ '& .MuiTypography-root': { color: '#D4E8FF' } }}>Career Check complete</SectionLabel>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.3rem' }, mt: 1 }}>Career Readiness Score: {careerCheck.total_score}/100</Typography>
            <Typography sx={{ mt: 1, maxWidth: 620, color: 'rgba(255,255,255,0.72)' }}>Use this score to understand your preparation level and decide where to focus your effort.</Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 2.5, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
          <Typography variant="h3">Score breakdown</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {scoreAreas.map(area => {
              const score = careerCheck.scores[area.key] || 0;
              return (
                <Box key={area.key}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={750} fontSize="0.88rem">{area.label}</Typography>
                    <Typography fontWeight={800} fontSize="0.85rem" color="primary.main">{score}/{area.max}</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={(score / area.max) * 100} sx={{ mt: 0.5, height: 6, borderRadius: 8, bgcolor: alpha(area.color, 0.08), '& .MuiLinearProgress-bar': { borderRadius: 8, bgcolor: area.color } }} />
                </Box>
              );
            })}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 2, p: 2.2, borderRadius: 5 }}>
          <Typography variant="h3">Recommended next action</Typography>
          <Typography color="text.secondary" fontSize="0.88rem" sx={{ mt: 0.8 }}>Your weakest area is <strong>{weakest.label}</strong>. Focus on improving this to boost your readiness score.</Typography>
        </Paper>

        <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
          <Button variant="contained" color="secondary" onClick={() => setPage('discover')}>Explore with Compass</Button>
          <Button variant="outlined" onClick={() => setPage('dashboard')}>Return home</Button>
          <Button variant="outlined" onClick={() => setCareerCheck(null)}>Retake Career Check</Button>
        </Stack>
      </Box>
    );
  }

  // Question view
  const answeredAreas = [...new Set(Object.keys(answers).map(k => questions.find(q => q.id === k)?.area))];

  return (
    <Box component="main" sx={{ maxWidth: 980, mx: 'auto', px: { xs: 1.5, md: 3.5 }, py: { xs: 2.5, md: 4 }, pb: { xs: 10 } }}>
      <SectionLabel icon={<PsychologyAltRounded fontSize="small" />}>Rule-based Career Check</SectionLabel>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.6 }}>Reflect on your readiness.</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 660 }}>A rule-based scoring engine (no AI API). Answer 7 questions across 6 areas to receive your Career Readiness Score.</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '240px minmax(0, 1fr)' }, gap: 2.2, mt: 3 }}>
        {/* Sidebar */}
        <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 5, alignSelf: 'start', bgcolor: 'rgba(12, 41, 126, 0.03)' }}>
          <SectionLabel icon={<InsightsRounded fontSize="small" />}>Score areas</SectionLabel>
          <Stack spacing={0.6} sx={{ mt: 1.2 }}>
            {scoreAreas.map(area => (
              <Stack key={area.key} direction="row" spacing={0.8} alignItems="center">
                <CheckCircleRounded color={answeredAreas.includes(area.label) ? 'success' : 'disabled'} fontSize="small" />
                <Box>
                  <Typography fontSize="0.79rem" fontWeight={answeredAreas.includes(area.label) ? 700 : 400} color={answeredAreas.includes(area.label) ? 'text.primary' : 'text.secondary'}>{area.label}</Typography>
                  <Typography fontSize="0.68rem" color="text.secondary">{area.max} pts</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Paper>

        {/* Questions */}
        <Paper variant="outlined" sx={{ p: { xs: 1.75, md: 2.5 }, borderRadius: 5 }}>
          <Stack spacing={2.2}>
            {questions.map((q, idx) => (
              <Box key={q.id}>
                <Typography fontWeight={800} fontSize="0.92rem">{q.question}</Typography>
                <Typography variant="caption" color="text.secondary">{q.area}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mt: 1.1 }}>
                  {q.options.map(opt => (
                    <Chip key={opt.label} label={opt.label} clickable
                      color={answers[q.id]?.label === opt.label ? 'primary' : 'default'}
                      variant={answers[q.id]?.label === opt.label ? 'filled' : 'outlined'}
                      onClick={() => setAnswers(curr => ({ ...curr, [q.id]: opt }))} />
                  ))}
                </Stack>
                {idx < questions.length - 1 && <Divider sx={{ mt: 2.2 }} />}
              </Box>
            ))}
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="contained" disabled={!ready} onClick={handleComplete} endIcon={<ArrowOutwardRounded />}>See my Career Readiness Score</Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
