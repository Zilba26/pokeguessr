import { FC } from 'react'
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, Image, useColorMode } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  showGameLinks?: boolean
}

const Header: FC<NavbarProps> = ({ showGameLinks = true }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const backLocation = location.pathname.split('/').slice(0, -1).join('/');

  return (
    <header>
      <h2><NavLink to="/">GuessVerce</NavLink></h2>
      {!isHome && showGameLinks && <div className='navlinks'>
        <NavLink to={`${backLocation}/guess-stats`}>GuessStats</NavLink>
        <NavLink to={`${backLocation}/wordle`}>Wordle</NavLink>
      </div>}
      <Box display="flex" gap="32px" alignItems="center">
        <Image h="30px" src={`https://flagpedia.net/data/flags/w1160/${i18n.language}.webp`} alt={i18n.language} onClick={() => i18n.changeLanguage(i18n.language === 'us' ? 'fr' : 'us')} />
        <i className="fa-solid fa-moon" onClick={toggleColorMode}></i>
      </Box>
    </header>
  );
}

export default Header;
