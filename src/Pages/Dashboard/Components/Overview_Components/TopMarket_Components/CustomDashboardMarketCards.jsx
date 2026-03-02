import { useRef } from 'react';
import { Box } from '@mui/material';
import IconButtons from './CustomDashboardMarketCards_Components/IconButtons';
import CardContentBox from './CustomDashboardMarketCards_Components/CardContentBox';

export default function CustomDashboardMarketCards({ setSelectedCoin, mode, cryptoListing, currency  }) {


  const scrollRef = useRef(null);

  return (
    <Box sx={{ position: 'relative', py: 2 }}>
      {/* Left arrow */}
      <IconButtons 
        mode={mode} 
        scrollRef={scrollRef} 
        type='left' 
      />

      {/* Card Content Box */}
      <CardContentBox 
        cryptoListing={cryptoListing} 
        scrollRef={scrollRef} 
        setSelectedCoin={setSelectedCoin} 
        currency={currency} 
      />  

      {/* Right arrow */}
      <IconButtons 
        mode={mode} 
        scrollRef={scrollRef} 
        type='right' 
      />
    </Box>
  );
}