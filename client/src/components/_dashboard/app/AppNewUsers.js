// material
import { alpha, styled } from '@mui/material/styles';
import { Card } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppNewUsers() {
  return (
    <RootStyle>
      <IconWrapperStyle>
      <img style={{borderRadius:"50px"}} src="https://image.shutterstock.com/image-vector/new-ripple-logo-xrp-260nw-1114107335.jpg"/>
      </IconWrapperStyle>
      <h1>XRP</h1>
    </RootStyle>
  );
}
