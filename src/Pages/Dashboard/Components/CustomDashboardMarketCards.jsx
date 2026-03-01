import { useRef } from 'react';
import { Box } from '@mui/material';
import IconButtons from './CustomDashboardMarketCards_Components/IconButtons';
import CardContentBox from './CustomDashboardMarketCards_Components/CardContentBox';

export default function CustomDashboardMarketCards({ setSelectedCoin, darkMode, cryptoListing, currency  }) {


  const scrollRef = useRef(null);

  return (
    <Box sx={{ position: 'relative', py: 2 }}>
      {/* Left arrow */}
      <IconButtons darkMode={darkMode} scrollRef={scrollRef} type='left' />
      {/* Card Content Box */}
      <CardContentBox cryptoListing={cryptoListing} scrollRef={scrollRef} setSelectedCoin={setSelectedCoin} currency={currency} />  
      {/* Right arrow */}
      <IconButtons darkMode={darkMode} scrollRef={scrollRef} type='right' />
    </Box>
  );
}