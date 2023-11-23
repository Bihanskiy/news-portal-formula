import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const AppButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '0.813rem',
  borderRadius: '0.438rem',
  fontWeight: 500,
  '&:hover': {
    boxShadow: 'none',
  },
});

export default AppButton;