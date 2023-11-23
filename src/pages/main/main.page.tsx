import React from 'react';

import { Box } from '@mui/material';
import { NewsCatalog } from '../../modules/news-catalog';

const MainPage = (): JSX.Element => {

  return (
    <Box component="section">
      <NewsCatalog
        title="Formula Top Headlines"
      />
    </Box>
  )
}

export default MainPage;