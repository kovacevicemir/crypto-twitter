import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
// import { getTweet, getCoinPriceHistory }
import { getTweet, getCoinPriceHistory, getCoinRanking } from '../../store/actions/main';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch(); //Upload
  const storeData = useSelector((state) => state.coin_price_history); //Download

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);

    let uuid = "";

    switch (searchTerm) {
      case "BTC":
        uuid = "Qwsogvtv82FCd"
        break;
    
      case "ETH":
        uuid = "razxDUgYGNAdQ";
        break;
    
      case "YSDT":
        uuid = "HIVsRcGKkPFtW";
        break;
    
      case "BNB":
        uuid = "WcwrkfNI4FUAe";
        break;
    
      case "HEX":
        uuid = "9K7m6ufraZ6gh";
        break;
    
      default:
        break;
    }

    // Search
    getCoinRankingAsync();
    accessTweet(searchTerm);
    testHistoryCoins(uuid);

  };

  const accessTweet = async (term) => {
    return getTweet(term, 10)
      .then(data => {
        dispatch(data)
      })
  };
  
  const testHistoryCoins = async (uuid) => {
    await dispatch(getCoinPriceHistory(uuid));
  };

  const getCoinRankingAsync = async () =>{
    await dispatch(getCoinRanking(5));
  }



  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
