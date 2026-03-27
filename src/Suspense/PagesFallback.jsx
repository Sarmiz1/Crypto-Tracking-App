import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';

export const PagesFallback = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack spacing={2} direction="row" justifyContent='center' mt='10rem' mb='3rem' alignItems='center'>
      <CircularProgress enableTrackSlot size="3rem" value={progress}/>
    </Stack>
  );
}
