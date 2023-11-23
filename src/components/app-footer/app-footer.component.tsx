import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import './app-footer.styles.scss';

const currentYear = new Date().getFullYear();
const email = "info@formula.com"

const AppFooter = () => {
  return (
    <Box component="footer" className="footer">
      <Box className="footer__container">
        <Typography variant="h5" component="a" href='/'>
          Formula
        </Typography>
        <Box className="footer-info">
          <Typography variant="body2">
            {`©Formula ${currentYear}. All Rights Reserved`}
          </Typography>
          <Box className="footer-mail">
            <EmailOutlinedIcon fontSize="small"/>
            <Typography component="a" href={`mailto:${email}`} className="footer-mail__text">
              {email}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AppFooter;