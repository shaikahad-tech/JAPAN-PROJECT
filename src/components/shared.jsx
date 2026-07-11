import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

export function HBridgeMark({ compact = false }) {
  return (
    <Stack direction="row" alignItems="center" spacing={compact ? 0.75 : 1}>
      <Box sx={{ width: compact ? 22 : 26, height: compact ? 22 : 26, borderRadius: 2, position: 'relative', background: '#13151B', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.2)' }}>
        <Box sx={{ position: 'absolute', width: '36%', height: '36%', bgcolor: 'white', borderRadius: '50%', top: '17%', left: '17%', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', width: '22%', height: '22%', bgcolor: '#1B6FE8', borderRadius: '50%', bottom: '18%', right: '18%', opacity: 0.8 }} />
      </Box>
      {!compact && <Typography fontWeight={700} letterSpacing="-0.03em" fontSize="1rem" color="#13151B">H-bridge <Box component="span" sx={{ color: 'rgba(3, 14, 49, 0.54)' }}>Career</Box></Typography>}
    </Stack>
  );
}

export function SectionLabel({ icon, children, sx = {} }) {
  return (
    <Stack direction="row" spacing={0.7} alignItems="center" sx={sx}>
      <Box sx={{ color: 'rgba(3, 14, 49, 0.54)', display: 'grid', placeItems: 'center' }}>{icon}</Box>
      <Typography variant="overline" sx={{ color: 'rgba(3, 14, 49, 0.54)', fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.72rem' }}>{children}</Typography>
    </Stack>
  );
}

export function SignalThread({ tone }) {
  return (
    <Box className="signal-thread" sx={{ mt: 0.8 }}>
      <Box component="span" sx={{ width: '55%', top: 10, left: '5%', transform: 'rotate(14deg)', color: tone[0], background: `linear-gradient(90deg, ${alpha(tone[0], 0)}, ${alpha(tone[0], 0.6)})` }} />
      <Box component="span" sx={{ width: '48%', top: 32, left: '34%', transform: 'rotate(-25deg)', color: tone[1], background: `linear-gradient(90deg, ${alpha(tone[1], 0.6)}, ${alpha(tone[1], 0)})` }} />
      <Box component="span" sx={{ width: '25%', top: 24, left: '8%', transform: 'rotate(-12deg)', color: '#34D399', background: `linear-gradient(90deg, ${alpha('#34D399', 0)}, ${alpha('#34D399', 0.5)})` }} />
    </Box>
  );
}
