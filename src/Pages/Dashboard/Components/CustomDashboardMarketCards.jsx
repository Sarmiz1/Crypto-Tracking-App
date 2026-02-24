import { useRef } from 'react';
import { Box } from '@mui/material';
import IconButtons from './CustomDashboardMarketCards_Components/IconButtons';
import CardContentBox from './CustomDashboardMarketCards_Components/CardContentBox';

export default function CustomDashboardMarketCards({ setSelectedCoin, darkMode, coins }) {


  const scrollRef = useRef(null);

  return (
    <Box sx={{ position: 'relative', py: 2 }}>
      {/* Left arrow */}
      <IconButtons darkMode={darkMode} scrollRef={scrollRef} type='left' />
      {/* Card Content Box */}
      <CardContentBox coins={coins} scrollRef={scrollRef} setSelectedCoin={setSelectedCoin} />  
      {/* Right arrow */}
      <IconButtons darkMode={darkMode} scrollRef={scrollRef} type='right' />
    </Box>
  );
}