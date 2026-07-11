import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Box, Button, Divider, Drawer, IconButton, Paper, Stack, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { BookmarkRounded, CloseRounded, Diversity3Rounded, MenuRounded, PsychologyAltRounded } from '@mui/icons-material';
import { HBridgeMark, SectionLabel } from './shared';

const navItems = [
  { id: 'dashboard', label: 'Home', icon: '📊' },
  { id: 'discover', label: 'Compass', icon: '🧭' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'journey', label: 'Workspace', icon: '📋' },
  { id: 'profile', label: 'Profile', icon: '👤' }
];

export { navItems };

export function AppHeader({ page, setPage, saved, setMobileNavOpen }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar className="nav-glass" elevation={0} position="sticky" color="transparent" sx={{ borderBottom: '1px solid', borderColor: 'rgba(12, 41, 126, 0.071)', zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ minHeight: { xs: 56, md: 64 }, px: { xs: 1.5, md: 3 }, gap: { xs: 0.75, md: 1.5 } }}>
        <HBridgeMark compact={mobile} />
        {!mobile && <Stack direction="row" spacing={0.25} sx={{ ml: 2.5, flex: 1, bgcolor: 'rgba(12, 41, 126, 0.04)', borderRadius: 24, p: 0.4 }}>
          {navItems.map(item => (
            <Button key={item.id} onClick={() => setPage(item.id)} size="small"
              sx={{
                borderRadius: 20, px: 1.75, py: 0.5, minHeight: 36, fontSize: '0.84rem', fontWeight: page === item.id ? 600 : 500,
                bgcolor: page === item.id ? 'white' : 'transparent',
                color: page === item.id ? '#13151B' : 'rgba(3, 14, 49, 0.54)',
                boxShadow: page === item.id ? '0 1px 3px rgba(12, 41, 126, 0.09), 0 0 1px rgba(12, 41, 126, 0.03)' : 'none',
                '&:hover': { bgcolor: page === item.id ? 'white' : 'rgba(12, 41, 126, 0.06)' }
              }}>
              {item.label}
            </Button>
          ))}
          <Button onClick={() => setPage('roles')} size="small"
            sx={{
              borderRadius: 20, px: 1.75, py: 0.5, minHeight: 36, fontSize: '0.84rem', fontWeight: page === 'roles' ? 600 : 500,
              bgcolor: page === 'roles' ? 'white' : 'transparent',
              color: page === 'roles' ? '#13151B' : 'rgba(3, 14, 49, 0.54)',
              boxShadow: page === 'roles' ? '0 1px 3px rgba(12, 41, 126, 0.09), 0 0 1px rgba(12, 41, 126, 0.03)' : 'none',
              '&:hover': { bgcolor: page === 'roles' ? 'white' : 'rgba(12, 41, 126, 0.06)' }
            }}>
            Jobs
          </Button>
        </Stack>}
        {mobile && <Box sx={{ flex: 1 }} />}
        {!mobile && <Button size="small" sx={{ color: 'rgba(3, 14, 49, 0.54)', fontSize: '0.82rem', borderRadius: 20 }}>English</Button>}
        <Tooltip title="Interested companies">
          <IconButton onClick={() => setPage('journey')} sx={{ color: saved.length ? '#10B981' : 'rgba(3, 14, 49, 0.38)' }}>
            <Badge color="secondary" variant="dot" invisible={!saved.length}><BookmarkRounded /></Badge>
          </IconButton>
        </Tooltip>
        {!mobile && <Button onClick={() => setPage('access')} size="small" sx={{ color: 'rgba(3, 14, 49, 0.54)', borderRadius: 20, fontSize: '0.82rem' }}>Sign in</Button>}
        <Button variant="contained" size={mobile ? 'small' : 'medium'} onClick={() => setPage('profile')} sx={{ whiteSpace: 'nowrap', borderRadius: 28, background: '#13151B', '&:hover': { background: '#2D313F' } }}>Build profile</Button>
        {mobile && <IconButton onClick={() => setMobileNavOpen(true)} sx={{ color: '#13151B' }}><MenuRounded /></IconButton>}
      </Toolbar>
    </AppBar>
  );
}

export function MobileDrawer({ open, onClose, page, setPage }) {
  return <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 280, p: 2.5, bgcolor: '#FAFBFE' } }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center"><HBridgeMark /><IconButton onClick={onClose}><CloseRounded /></IconButton></Stack>
    <Divider sx={{ my: 2 }} />
    <Stack spacing={0.5}>{[...navItems, { id: 'roles', label: 'Jobs' }, { id: 'admin', label: 'Admin' }].map(item => (
      <Button key={item.id} onClick={() => { setPage(item.id); onClose(); }}
        sx={{
          justifyContent: 'flex-start', borderRadius: 14, px: 2, py: 1.1,
          bgcolor: page === item.id ? '#13151B' : 'transparent',
          color: page === item.id ? 'white' : 'rgba(3, 14, 49, 0.54)',
          fontWeight: page === item.id ? 600 : 500,
          '&:hover': { bgcolor: page === item.id ? '#2D313F' : 'rgba(12, 41, 126, 0.04)' }
        }}>
        {item.label}
      </Button>
    ))}</Stack>
  </Drawer>;
}

export function ExplainPanel({ open, onClose }) {
  return <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '24px 24px 0 0', maxWidth: 900, mx: 'auto', width: '100%', p: { xs: 2.25, md: 3.25 } } }}>
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
      <Box>
        <SectionLabel icon={<PsychologyAltRounded fontSize="small" />}>Transparency note</SectionLabel>
        <Typography variant="h2" sx={{ mt: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>What "AI" means in this frontend.</Typography>
      </Box>
      <IconButton onClick={onClose}><CloseRounded /></IconButton>
    </Stack>
    <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 1.5 }}>
      {[['Your inputs', 'The prompts and filters you choose shape the screen in real time.'], ['Local demo labels', 'Company signals are mock data for the frontend, not real employer facts.'], ['Human review', 'A referral request becomes a conversation. It is never an automated decision.']].map(([title, copy]) => (
        <Paper key={title} variant="outlined" sx={{ p: 2, borderRadius: 16 }}>
          <Typography fontWeight={700} fontSize="0.92rem">{title}</Typography>
          <Typography sx={{ color: 'rgba(3, 14, 49, 0.54)', fontSize: '0.82rem', lineHeight: 1.55, mt: 0.55 }}>{copy}</Typography>
        </Paper>
      ))}
    </Box>
  </Drawer>;
}

export function MobileBottomNav({ page, setPage }) {
  const theme = useTheme();
  return (
    <Paper elevation={0} sx={{ position: 'fixed', zIndex: theme.zIndex.appBar, bottom: 0, left: 0, right: 0, borderRadius: 0, borderTop: '1px solid', borderColor: 'rgba(12, 41, 126, 0.071)', background: 'rgba(250, 251, 254, 0.88)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <BottomNavigation showLabels value={page} onChange={(_, value) => setPage(value)} sx={{ height: 60, bgcolor: 'transparent', '& .MuiBottomNavigationAction-root': { color: 'rgba(3, 14, 49, 0.38)', minWidth: 0 }, '& .Mui-selected': { color: '#13151B !important' } }}>
        {navItems.map(item => <BottomNavigationAction key={item.id} value={item.id} label={item.label} icon={<Box sx={{ fontSize: '1.15rem' }}>{item.icon}</Box>} />)}
      </BottomNavigation>
    </Paper>
  );
}
