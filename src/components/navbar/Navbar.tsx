import { FC } from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

interface NavbarProps {}

const Header: FC<NavbarProps> = () => {

  const {colorMode, toggleColorMode} = useColorMode();

  // const toggleTheme = () => {
  //   const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   const theme = localStorage.getItem('theme') ?? (prefersDarkMode ? 'dark' : 'light');
  //   localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  //   //setTheme();
  // }

  return (
    <header>
      <h2>Pokeguessr</h2>
      <div className='navlinks'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/random">Random</NavLink>
      </div>
      <div>
          <i className="fa-solid fa-moon" onClick={toggleColorMode}></i>
      </div>
    </header>
  );
}

export default Header;
