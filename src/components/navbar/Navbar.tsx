import { FC } from 'react'
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

interface NavbarProps { 
  showGameLinks?: boolean
}

const Header: FC<NavbarProps> = ({ showGameLinks = true }) => {

  const { colorMode, toggleColorMode } = useColorMode();
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
      <div>
        <i className="fa-solid fa-moon" onClick={toggleColorMode}></i>
      </div>
    </header>
  );
}

export default Header;
